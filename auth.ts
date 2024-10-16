import { signInSchema } from "@/lib/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET, // Ensure you have set your secret

    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                const parsedCredentials = signInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid Credentials", parsedCredentials.error.errors);
                    alert("Invalid credentials")
                    return null;
                }

                // Retrieve email and password from environment variables
                const adminEmail = process.env.ADMIN1_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                // Check the credentials against environment variables
                if (
                    credentials.email === adminEmail &&
                    credentials.password === adminPassword
                ) {
                    // Return a user object if the credentials match
                    const user = {
                        id: "1",
                        name: "Admin",
                        email: adminEmail,
                    };
                    return user; // Return user object if authenticated
                }

                console.log("Invalid credentials");
                return null; // Return null if authentication fails
            }
        })
    ],

    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url === "/auth/signin" && baseUrl) {
                return "/admin";
            }
            return baseUrl;
        },
        async session({ session, user }) {
            session.user = user;
            return session;
        },
    },

    pages: {
        signIn: "/auth/signin" // Custom sign-in page
    }
});
