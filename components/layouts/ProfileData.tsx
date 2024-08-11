"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useUser } from "@/hooks/useUser";

export function ProfileData() {
	const { user, student, liff } = useUser();

	return (
		<div>
			{user && (
				<>
					<h2 className="text-center text-lg font-bold py-5">{user.displayName}</h2>
					<div className="flex items-center justify-around">
						<Avatar className="h-full w-20 max-w-64">
							{user.pictureUrl && (
								<AvatarImage src={user.pictureUrl} alt={user.displayName ?? ""} />
							)}
							<AvatarFallback>{user.displayName}</AvatarFallback>
						</Avatar>
						<div className="flex">
							<div className="block px-2 text-center">
								<p className="font-semibold py-1">{user.role}</p>
								<HoverCard>
									<HoverCardTrigger>
										<p>権限</p>
									</HoverCardTrigger>
									<HoverCardContent>
										ユーザーが所持している権限の情報です。
									</HoverCardContent>
								</HoverCard>
							</div>
							<div className="block px-2 text-center">
								<p className="font-semibold py-1">
									{user?.isLinked ? "連携済" : "未連携"}
								</p>
								<HoverCard>
									<HoverCardTrigger>
										<p>連携状態</p>
									</HoverCardTrigger>
									{user?.isLinked ? (
										<HoverCardContent>{user?.studentName}</HoverCardContent>
									) : (
										<HoverCardContent>
											生徒情報を連携しているかの情報です。<br></br>
											連携していれば生徒氏名が表示されます。
										</HoverCardContent>
									)}
								</HoverCard>
							</div>
							<div className="block px-2 text-center">
								<p className="font-semibold py-1">
									{user?.isAvailable ? "利用可能" : "利用不可"}
								</p>
								<HoverCard>
									<HoverCardTrigger>
										<p>利用状態</p>
									</HoverCardTrigger>
									<HoverCardContent>
										アプリケーションを利用可能かの情報です。
									</HoverCardContent>
								</HoverCard>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
