import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./_providers/auth-provider";
import { LoadingProvider } from "./_providers/loading-provider";
import { QueryProvider } from "./_providers/query-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "シンプル日記",
	description: "シンプル日記",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthProvider>
					<QueryProvider>
						<LoadingProvider>{children}</LoadingProvider>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
