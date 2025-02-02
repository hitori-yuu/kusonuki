import { useEffect, useState, useCallback, useRef } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";
import { CreateUser, Student, UpdateUser, User } from "@/lib/server/actions";
import { toast } from "sonner";

type CacheData = {
	data: UserData | StudentData;
	timestamp: number;
};

const CACHE_DURATION = 10 * 60 * 1000; // 10分

const getUserData = async (userId: string): Promise<UserData | null> => {
	try {
		// まずキャッシュをチェック
		const cachedUser = sessionStorage.getItem(`userData_${userId}`);
		if (cachedUser) {
			const { data, timestamp }: CacheData = JSON.parse(cachedUser);
			if (Date.now() - timestamp < CACHE_DURATION) {
				console.log("キャッシュからユーザー情報を取得");
				return data as UserData;
			}
		}

		// キャッシュがない場合はAPIから取得
		console.log("APIからユーザー情報を取得");
		const userData = await User(userId);

		if (userData) {
			sessionStorage.setItem(`userData_${userId}`, JSON.stringify({ data: userData, timestamp: Date.now() }));
			return userData;
		}
		return null;
	} catch (error) {
		console.error("ユーザー情報取得中にエラーが発生しました:", error);
		return null;
	}
};

const getStudentData = async (studentId: number): Promise<StudentData | null> => {
	try {
		const cachedStudent = sessionStorage.getItem(`studentData_${studentId}`);
		if (cachedStudent) {
			const { data, timestamp }: CacheData = JSON.parse(cachedStudent);
			if (Date.now() - timestamp < CACHE_DURATION) {
				console.log("キャッシュから生徒情報を取得");
				return data as StudentData;
			}
		}

		console.log("APIから生徒情報を取得");
		const studentData = await Student(studentId);

		if (studentData) {
			sessionStorage.setItem(
				`studentData_${studentId}`,
				JSON.stringify({ data: studentData, timestamp: Date.now() }),
			);
			return studentData;
		}
		return null;
	} catch (error) {
		console.error("生徒情報取得中にエラーが発生しました:", error);
		return null;
	}
};

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>(null);
	const [isLiffLoading, setLiffLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const { liff } = useLiff();
	const isInitialLoadDone = useRef(false);

	const refreshData = useCallback(async () => {
		console.log("情報を更新中 Liff:", liff?.isLoggedIn());

		if (!liff || !liff.isLoggedIn()) {
			console.log("LIFFが初期化されていないか、ログインされていません。");
			setLiffLoading(false);
			return;
		}

		try {
			setLiffLoading(true);
			setError(null);

			// プロフィール取得
			console.log("LIFFのプロファイルを取得中...");
			const profile = await liff.getProfile();

			if (!profile) {
				throw new Error("プロフィール取得に失敗しました");
			}

			// ユーザーデータ取得
			let userData = await getUserData(profile.userId);

			// 新規ユーザー作成
			if (!userData && profile.pictureUrl) {
				console.log("新規ユーザーを作成中...");
				try {
					await CreateUser(profile.userId, profile.displayName, profile.pictureUrl);
					console.log("新たなユーザーを作成。");

					// 作成したユーザー情報を再取得
					userData = await getUserData(profile.userId);
				} catch (createError) {
					console.error("ユーザー作成中にエラーが発生しました:", createError);
					throw new Error("ユーザー作成に失敗しました");
				}
			}

			// ユーザー情報更新
			if (
				userData &&
				(userData.displayName !== profile.displayName || userData.pictureUrl !== profile.pictureUrl) &&
				profile.pictureUrl
			) {
				console.log("ユーザーを更新中...");
				try {
					await UpdateUser(userData.id, profile.displayName, profile.pictureUrl);
					userData = await getUserData(profile.userId);
				} catch (updateError) {
					console.error("ユーザー更新中にエラーが発生しました:", updateError);
					throw new Error("ユーザー更新に失敗しました");
				}
			}

			setUser(userData);

			// 生徒情報取得
			if (userData?.isLinked && userData.studentId) {
				const studentData = await getStudentData(userData.studentId);
				setStudent(studentData);
			}
		} catch (error) {
			console.error("情報更新中にエラーが発生しました", error);
			const errorMessage = error instanceof Error ? error.message : "データ取得に失敗しました";
			setError(new Error(errorMessage));
			toast.error(errorMessage);
		} finally {
			setLiffLoading(false);
		}
	}, [liff]);

	// 初回ロード時の処理
	useEffect(() => {
		console.log("useEffect発火 初回ロード:", isInitialLoadDone.current);

		const initializeData = async () => {
			if (!liff) {
				console.log("LIFFはまだ使用できません。");
				return;
			}

			// LIFF の初期化状態を確認
			const isReady = await new Promise<boolean>((resolve) => {
				const checkReady = () => {
					if (liff.isLoggedIn()) {
						resolve(true);
					} else {
						setTimeout(checkReady, 100);
					}
				};
				checkReady();
			});

			if (isReady && !isInitialLoadDone.current) {
				console.log("初回ロードを開始します...");
				await refreshData();
				isInitialLoadDone.current = true;
			}
		};

		void initializeData();
		setLiffLoading(false);
	}, [liff, refreshData]);

	const manualRefresh = useCallback(async () => {
		console.log("手動更新が発生しました。");
		if (user?.id) {
			sessionStorage.removeItem(`userData_${user.id}`);
			if (user.studentId) {
				sessionStorage.removeItem(`studentData_${user.studentId}`);
			}
		}
		isInitialLoadDone.current = false;
		await refreshData();
	}, [refreshData, user]);

	return {
		user,
		student,
		liff,
		isLiffLoading,
		error,
		refreshData: manualRefresh,
	};
};
