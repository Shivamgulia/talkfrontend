import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const url = process.env.NEXT_PUBLIC_API_URL;

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: {
          label: "Mobile",
          type: "text",
          placeholder: "+91 XXXXXXXXXX",
        },
        token: { label: "Token", type: "text" },
        // password: { label: "ShipName", type: "text" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        console.log(`${process.env.API_URL}/api/v1/hello`);
        console.log(`Bearer ${credentials.token}`);

        try {
          const res = await fetch(`${process.env.API_URL}/api/v1/hello`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${credentials.token}`,
            },
          });

          if (!res.ok) {
            throw Error("Invalid");
          }
          return {
            id: "123142",
            phoneNumber: credentials.mobile,
            token: credentials.token,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      session.user = token;
      session.accessToken = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
});
