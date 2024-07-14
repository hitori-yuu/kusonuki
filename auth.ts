import NextAuth, { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import line from "next-auth/providers/line"

export const config: NextAuthConfig = {
    providers: [
        line({
            clientId: process.env.AUTH_LINE_ID,
            clientSecret: process.env.AUTH_LINE_SECRET,
            checks: ["state"],
        }),
    ],
    basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl;
                if (pathname == "/protected-page") return !!auth;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        jwt({ token, trigger, session }) {
            if(trigger === "update") token.name = session.user.name;
            return token;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

