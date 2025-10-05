import NextAuth, {
  DefaultSession,
  NextAuthOptions,
  Session,
  User,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

/**
 * --- Type Augmentation ---
 */
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    is_active: boolean;
    current_plan: string;
    is_premium_plan_active: boolean;
  
  }
}

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    is_active: boolean;
    current_plan: string;
    is_premium_plan_active: boolean;
  }
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      is_active: boolean;
      current_plan: string;
      is_premium_plan_active: boolean;
    } & DefaultSession['user'];
  }
}

const baseUrl = process.env["Production"] ? process.env["API_BASE_URL"] : process.env["API_BASE_URL_LOCAL"]

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      `${baseUrl}/user/auth/token/refresh/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: token['refreshToken'] }),
      }
    );

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens?.data?.access,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // expires in 1 hour
      refreshToken: refreshedTokens?.data?.refresh ?? token.refreshToken, // fall back to old one
    };
  } catch (error) {
    console.log('Refresh token error:', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },

  providers: [

    // Hanlde google auth 
    GoogleProvider({
      clientId: process.env['GOOGLE_CLIENT_ID']!,
      clientSecret: process.env['GOOGLE_CLIENT_SECRET']!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;
     
        const res = await fetch(
          `${baseUrl}/auth/login/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const result = await res.json();
        if (res.status === 401) {
          return result?.message
        }
        console.log("Result: ", result)
          console.log("Rse: ", res)
        return result
        // return {
        //   id: user.id,

        //   name: `${user.first_name} ${user.last_name}`,
        //   email: user.email,
        //   image: user.profile_image,

        //   accessToken: tokens.access,
        //   refreshToken: tokens.refresh,

        
        //   is_active: user.is_active,
        //   current_plan: user.current_plan,
        //   is_premium_plan_active: user.is_premium_plan_active,
        // };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin-signup',
    signOut: '/auth/signin-signup',
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000;

    
        token.is_active = user.is_active;
        token.current_plan = user.current_plan;
        token.is_premium_plan_active = user.is_premium_plan_active;
      }

      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires &&
        token.accessToken
      ) {
        return token;
      }

      return refreshAccessToken(token);
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
          email: token.email ?? null,
          image: token.picture ?? null,
          is_active: token.is_active ?? null,
        
          is_premium_plan_active: token.is_premium_plan_active ?? null,
          current_plan: token.current_plan ?? null,
          name: token.name ?? null,
         
        };
      }
      console.log('session: ', session);
      console.log('token: ', token);

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
