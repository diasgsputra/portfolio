import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL?.trim();
                const adminPassword = process.env.ADMIN_PASSWORD?.trim();

                if (
                    credentials?.email === adminEmail &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: adminEmail }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith('/admin');

            if (isAdminRoute && !nextUrl.pathname.startsWith('/admin/login')) {
                if (isLoggedIn) return true;
                return false; // Redirects to signIn page
            } else if (isLoggedIn && nextUrl.pathname.startsWith('/admin/login')) {
                return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }
            return true;
        },
    },
})
