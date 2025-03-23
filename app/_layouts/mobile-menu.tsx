"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/app/_components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
	{ title: "日記", href: "/diary" },
	{ title: "タグ", href: "/tag" },
];

export function MobileMenu() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="md:hidden">
					<MenuIcon className="h-5 w-5" />
					<span className="sr-only">メニューを開く</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="pr-0">
				<SheetTitle className="sr-only">メインメニュー</SheetTitle>
				<div className="flex flex-col gap-4 py-4">
					{items.map((item) => {
						const isActive =
							pathname === item.href ||
							(item.href !== "/" && pathname?.startsWith(item.href));

						return (
							<SheetClose asChild key={item.href}>
								<Link
									href={item.href}
									className={cn(
										"flex items-center px-4 py-2 text-lg font-medium",
										isActive
											? "bg-muted text-foreground"
											: "text-foreground/60 hover:bg-muted/50 hover:text-foreground",
									)}
								>
									{item.title}
								</Link>
							</SheetClose>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-label="メニュー"
			{...props}
		>
			<title>メニュー</title>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}
