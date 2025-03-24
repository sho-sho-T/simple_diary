"use client";

import { useLoadingNavigation } from "@/app/_hooks/use-loading-navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";
import { UserNav } from "./user-nav";

interface HeaderProps {
	className?: string;
}

export function Header({ className }: HeaderProps) {
	const { navigateWithLoading } = useLoadingNavigation();
	const pathname = usePathname();

	const handleLogoClick = (e: React.MouseEvent) => {
		e.preventDefault();
		// 現在トップページの場合は遷移しない
		if (pathname === "/") {
			return;
		}
		navigateWithLoading("/");
	};

	return (
		<header
			className={cn(
				"sticky top-0 z-40 w-full border-b bg-background",
				className,
			)}
		>
			<div className="container flex h-16 items-center px-4 sm:px-6">
				<Link
					href="/"
					onClick={handleLogoClick}
					className="flex items-center space-x-2"
				>
					<span className="font-bold text-xl">シンプル日記</span>
				</Link>
				<div className="hidden md:flex md:flex-1 md:justify-center">
					<MainNav />
				</div>
				<div className="ml-auto flex items-center space-x-4">
					<UserNav />
					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
