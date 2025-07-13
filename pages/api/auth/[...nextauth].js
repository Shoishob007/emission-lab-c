import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

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

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: (profile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  pages: { signIn: "/login", signOut: "/", },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
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
        } else if (account.provider === 'linkedin') {
          token.user = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            provider: 'linkedin',
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