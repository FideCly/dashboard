import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthServices } from "@/Api/Services";
import { setCookie } from "nookies";

const nextAuthOptions = (req, res) => {
    return {
        secret: process.env.NEXTAUTH_SECRET,
        providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email: { label: "email", type: "text", placeholder: "jsmith" },
                    password: { label: "Password", type: "password" },
                },
                async authorize (credentials) {
                    if (!credentials?.email || !credentials?.password) return null;

                    try {
                        // Sign-in user
                        const res = await AuthServices.login(credentials);
                        const data = await res;
                        if (data.data.status != 200) return null;
                        setCookie({ res }, "token", res.data.token, {
                            maxAge: 30 * 24 * 60 * 60,
                            path: "/",
                        });
                        // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                        // axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
                        // const user  = await axios.get(`/user/${res.data.userUuid}`)
                        return data;
                        // Error
                    } catch (err) {
                        console.error(err);
                        throw new Error(`${err}`);
                    }
                },
            }),
        ],
        session: {
            strategy: "jwt",
        },
        callbacks: {
            jwt ({ token, account, user }) {
                if (account) {
                    token.id = user?.data.userUuid
                }
                return token
            },
            async session ({ session, token, user }) {
                // Send properties to the client, like an access_token and user id from a provider.
                session.user.email = token.id
                return session
            },
        },
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};
