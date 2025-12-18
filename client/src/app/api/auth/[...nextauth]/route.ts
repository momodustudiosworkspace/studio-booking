import NextAuth, {
  DefaultSession,
  NextAuthOptions,
  Session,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import baseUrl from "@/config/baseUrl";

/**
 * --- Type Augmentation ---
 */
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    first_name: string;
    last_name: string;
    accessTokenExpires: number;
    isMember: boolean;
    isAdmin: boolean;
    phoneNumber:string
  }
}

declare module "next-auth" {
  interface User {
    accessToken: string;
    email: string;
    refreshToken: string;
    isMember: boolean;
    isAdmin: boolean;
    first_name: string;
    last_name: string;
    phoneNumber:string
  }
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      email: string;
      first_name: string;
      last_name: string;
      isMember: boolean;
      isAdmin: boolean;
      phoneNumber:string
    } & DefaultSession["user"];
  }
}

// async function refreshAccessToken(token: JWT): Promise<JWT> {
//   try {
//     const res = await fetch(
//       `${baseUrl}/user/auth/token/refresh/`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refresh: token['refreshToken'] }),
//       }
//     );

//     const refreshedTokens = await res.json();

//     if (!res.ok) throw refreshedTokens;

//     return {
//       ...token,
//       accessToken: refreshedTokens?.data?.access,
//       accessTokenExpires: Date.now() + 60 * 60 * 1000, // expires in 1 hour
//       refreshToken: refreshedTokens?.data?.refresh ?? token.refreshToken, // fall back to old one
//     };
//   } catch (error) {
//     console.log('Refresh token error:', error);
//     return { ...token, error: 'RefreshAccessTokenError' };
//   }
// }

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"]!,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
      issuer: "https://accounts.google.com", // ✅ skips discovery step
      httpOptions: {
        timeout: 10000, // wait up to 10s
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${baseUrl}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        if (res.status === 400) {
          throw new Error(
            user?.message || "Invalid request. Please check your inputs."
          );
        }

        if (res.status === 401) {
          throw new Error(
            user?.message || "Unauthorized. Incorrect email or password."
          );
        }

        if (!res.ok) {
          throw new Error(
            user?.message || "Something went wrong. Please try again later."
          );
        }

        console.log("User login data: ", user);

        return {
          id: user.user._id,
          email: user.user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          isMember: user.user.isMember,
          isAdmin: user.user.isAdmin,
          first_name: user.user.first_name,
          last_name: user.user.last_name,
          phoneNumber: user.user.phoneNumber

        };
      },
    }),
  ],

  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },

  callbacks: {
    async signIn({ user, account }) {
      // Runs when user signs in (Google or Credentials)
      if (account?.provider === "google") {
        try {
          // Example: send user info to your backend for signup/login
          const res = await fetch(`${baseUrl}/auth/google-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              accessToken: account.access_token,
            }),
          });

          if (!res.ok) {
            console.log("Backend Google login failed");
            return false; // cancel sign-in
          }

          const data = await res.json();
          console.log("User synced with backend:", data);

          // // You can attach any data you want to `user` here
          // (user as any).backendToken = data.token;
          // (user as any).isMember = data.user.isMember;
          // (user as any).isAdmin = data.user.isAdmin;
          user.accessToken = data.accessToken;
          user.refreshToken = data.refreshToken;
          user.email = data.user.email;
          user.isAdmin = data.user.isAdmin;
          user.isMember = data.user.isMember;
          user.first_name = data.user.first_name;
          user.last_name = data.user.last_name;

          console.log("user from google: ", user);

          return true;
        } catch (error) {
          console.error("Error syncing Google user:", error);
          return false;
        }
      }

      return true; // For credentials login
    },
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000;
        token.isMember = user.isMember;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.phoneNumber = user.phoneNumber
      }

      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires &&
        token.accessToken
      ) {
        return token;
      }
      return token;
      // return refreshAccessToken(token);
    },
    async session({
      session,
      token,
    }: {
      session: Session | DefaultSession;
      token: JWT;
    }): Promise<Session | DefaultSession> {
      if (token) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken,
          image: token.picture ?? null,
          isMember: token.isMember ?? null,
          name: token.name ?? null,
          email: token.email ?? null,
          first_name: token.first_name ?? null,
          last_name: token.last_name ?? null,
          phoneNumber:token.phoneNumber
        };
      }
      console.log(token.first_name, token.last_name);

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
