import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from 'next-auth'
import axios from "axios";
import { IUserAuthPayload } from "@/Api/Models/User";
import { AuthServices } from "@/Api/Services";
import Cookies from "js-cookie";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const data : IUserAuthPayload = {
                    email: credentials.email,
                    password: credentials.password,
                }
                const user = await AuthServices.login(data)

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    Cookies.set('token', user.data.token)
                    return Promise.resolve(user);
                } else {
                    // If you return null or false then the credentials will be rejected
                    return Promise.resolve(null);
                    // You can also Reject this callback with an Error or with a URL:
                    // return Promise.reject(new Error('error message')) // Redirect to error page
                }
            },
        }),
    ]
}

export default NextAuth(authOptions);
