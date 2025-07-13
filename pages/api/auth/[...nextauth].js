import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();
        if (res.ok && data && data.user && data.user.email) {
          return {
            ...data.user,
            accessToken: data.token?.access,
            refreshToken: data.token?.refresh,
          };
        }
        throw new Error(data.detail || "Login failed");
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        },
      },
    }),
    
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'public_profile',
          auth_type: 'reauthenticate',
          display: 'popup',
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || `${profile.first_name} ${profile.last_name}`,
          email: profile.email,
          image: profile.picture?.data?.url,
        }
      },
    }),
  ],
  pages: { signIn: "/login", signOut: "/", },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Only run this logic during initial sign-in (when account exists)
      if (account) {
        if (user?.accessToken) {
          token.user = { ...user, provider: "credentials" };
        } else if (account.provider === "google") {
          token.user = {
            email: profile?.email ?? user?.email,
            name: profile?.name ?? user?.name,
            image: profile?.picture ?? user?.image,
            provider: "google",
          };
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.idToken = account.id_token;
        } else if (account.provider === 'facebook') {
          token.user = {
            id: profile.id,
            name: profile.name || `${profile.first_name} ${profile.last_name}`,
            email: profile.email,
            image: profile.picture?.data?.url,
            provider: 'facebook',
          };
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.idToken = account.id_token;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      if (token?.accessToken) session.accessToken = token.accessToken;
      if (token?.refreshToken) session.refreshToken = token.refreshToken;
      if (token?.idToken) session.idToken = token.idToken;
      console.log("Session :: ", session);

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});