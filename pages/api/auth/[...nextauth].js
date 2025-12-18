import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

const socialAuthApi = `${process.env.NEXT_PUBLIC_API}/api/users/social-auth/`;

async function getSocialTokens({ email, name, provider, provider_id }) {
  try {
    const res = await fetch(socialAuthApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, provider, provider_id }),
    });
    if (!res.ok) throw new Error("Social auth failed");
    const data = await res.json();
    return {
      accessToken: data.token?.access,
      refreshToken: data.token?.refresh,
    };
  } catch (err) {
    console.error("Social token error:", err);
    return {};
  }
}

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
        console.log("Data . User :: ", data.user)
        if (res.ok && data && data.user && data.user.email) {
          return {
            ...data.user,
            accessToken: data.token?.access,
            refreshToken: data.token?.refresh,
            provider: "credentials",
            provider_id: data.user.id,
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
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email public_profile',
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
  pages: { 
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Credentials login
      if (account?.provider === "credentials" && user?.accessToken) {
        token.user = { ...user, provider: "credentials" };
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      // Social logins
      if (account && ["google", "facebook", "linkedin"].includes(account.provider)) {
        let socialUser = {};
        if (account.provider === "google") {
          socialUser = {
            email: profile?.email ?? user?.email,
            name: profile?.name ?? user?.name,
            provider: "google",
            provider_id: profile?.sub ?? account.providerAccountId,
          };
        } else if (account.provider === "facebook") {
          socialUser = {
            email: profile.email,
            name: profile.name || `${profile.first_name} ${profile.last_name}`,
            provider: "facebook",
            provider_id: profile.id,
          };
        } else if (account.provider === "linkedin") {
          socialUser = {
            email: profile.email,
            name: profile.name,
            provider: "linkedin",
            provider_id: profile.sub,
          };
        }
        const { accessToken, refreshToken } = await getSocialTokens(socialUser);
        token.user = { ...socialUser, image: profile?.picture };
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      if (token?.accessToken) session.accessToken = token.accessToken;
      if (token?.refreshToken) session.refreshToken = token.refreshToken;
      console.log("Session :: ", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});