// NextAuth設定

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const config: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	basePath: "/api/auth", // apiのpath
	callbacks: {
		// 認証後に行う処理
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl;
			if (pathname === "/") return !!auth;
		},
		jwt({ token, trigger, session }) {
			if (trigger === "update") token.name = session.user.name;
			return token;
		},
		redirect: async ({ baseUrl }) => {
			return baseUrl;
		},
		async session({ session, user }) {
			// sessionにuser_idを含める
			session.user.id = user.id;
			return session;
		},
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
