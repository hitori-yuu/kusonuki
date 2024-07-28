import NextAuth, { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import line from "next-auth/providers/line";

const prisma = new PrismaClient()

export const config: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        line({
            clientId: process.env.AUTH_LINE_ID,
            clientSecret: process.env.AUTH_LINE_SECRET,
            checks: ["state"],
        }),
    ],
    basePath: "/api/auth",
    callbacks: {
        async authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl;
                if (pathname == "/protected-page") return !!auth;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async jwt({ token, user, profile }) {
            return token;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

