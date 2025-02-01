import { useEffect, useState, useCallback, useRef } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";
import { CreateUser, Student, UpdateUser, User } from "@/lib/server/actions";
import type { Profile } from "@liff/get-profile/lib/index.d.ts";
import { toast } from "sonner";

type CacheData = {
	data: UserData | StudentData;
	timestamp: number;
};

const CACHE_DURATION = 10 * 60 * 1000; // 10分

const getUserData = async (userId: string): Promise<UserData | null> => {
	console.log("Getting user data for userId:", userId);

	try {
		// まずキャッシュをチェック
		const cachedUser = sessionStorage.getItem(`userData_${userId}`);
		if (cachedUser) {
			const { data, timestamp }: CacheData = JSON.parse(cachedUser);
			if (Date.now() - timestamp < CACHE_DURATION) {
				console.log("Returning cached user data:", data);
				return data as UserData;
			}
		}

		// キャッシュがない場合はAPIから取得
		console.log("Fetching user data from API");
		const userData = await User(userId);
		console.log("API returned user data:", userData);

		if (userData) {
			sessionStorage.setItem(`userData_${userId}`, JSON.stringify({ data: userData, timestamp: Date.now() }));
			return userData;
		}
		return null;
	} catch (error) {
		console.error("Error in getUserData:", error);
		return null;
	}
};

const getStudentData = async (studentId: number): Promise<StudentData | null> => {
	console.log("Getting student data for studentId:", studentId);

	try {
		const cachedStudent = sessionStorage.getItem(`studentData_${studentId}`);
		if (cachedStudent) {
			const { data, timestamp }: CacheData = JSON.parse(cachedStudent);
			if (Date.now() - timestamp < CACHE_DURATION) {
				console.log("Returning cached student data:", data);
				return data as StudentData;
			}
		}

		console.log("Fetching student data from API");
		const studentData = await Student(studentId);
		console.log("API returned student data:", studentData);

		if (studentData) {
			sessionStorage.setItem(
				`studentData_${studentId}`,
				JSON.stringify({ data: studentData, timestamp: Date.now() }),
			);
			return studentData;
		}
		return null;
	} catch (error) {
		console.error("Error in getStudentData:", error);
		return null;
	}
};

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const { liff } = useLiff();
	const isInitialLoadDone = useRef(false);

	const refreshData = useCallback(async () => {
		console.log("refreshData called, LIFF status:", liff?.isLoggedIn());

		if (!liff || !liff.isLoggedIn()) {
			console.log("LIFFが初期化されていないか、ログインされていません。");
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
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
				console.log("Creating new user");
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
				console.log("Updating user");
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
			console.error("Error in refreshData:", error);
			const errorMessage = error instanceof Error ? error.message : "データ取得に失敗しました";
			setError(new Error(errorMessage));
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [liff]);

	// 初回ロード時の処理
	useEffect(() => {
		console.log("useEffect triggered, isInitialLoadDone:", isInitialLoadDone.current);

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
				console.log("Starting initial data load");
				await refreshData();
				isInitialLoadDone.current = true;
			}
		};

		void initializeData();
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
		isLoading,
		error,
		refreshData: manualRefresh,
	};
};
