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
                async authorize (credentials, req) {
                    // Add logic here to look up the user from the credentials supplied
                    const data = {
                        email: credentials.email,
                        password: credentials.password,
                    }
                    return AuthServices.login(data).then(response => {
                        const user = response.data;
                        //create cookie 
                        setCookie({res},"token", response.data.token, {
                            maxAge: 30 * 24 * 60 * 60,
                            path: "/",
                        });
                        return user;
                    })
                        .catch(error => {
                            console.log(error);
                            return null;
                        })

                },
            }),
        ],
        session: {
            strategy: "jwt",
        },
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};
