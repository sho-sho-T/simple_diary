"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ title: "日記", href: "/diary" },
	{ title: "タグ", href: "/tag" },
];

interface MainNavProps {
	className?: string;
}

export function MainNav({ className }: MainNavProps) {
	const pathname = usePathname();

	return (
		<nav className={cn("flex items-center space-x-6", className)}>
			{items.map((item) => {
				const isActive =
					pathname === item.href ||
					(item.href !== "/" && pathname?.startsWith(item.href));

				return (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive ? "text-foreground" : "text-foreground/60",
						)}
					>
						{item.title}
					</Link>
				);
			})}
		</nav>
	);
}
