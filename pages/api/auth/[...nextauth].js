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

async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();

    return {
      accessToken: data.token?.access,
      refreshToken: data.token?.refresh || refreshToken,
      user: data.user || {},
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
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
        // Handle refresh token flow - when user comes with just email from refresh
        if (credentials.email && credentials.password === "dummy-password-for-refresh") {
          try {
            return {
              id: "temp-refresh-id",
              email: credentials.email,
              name: "Refreshed User",
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
              provider: "credentials",
              provider_id: "temp-refresh-id",
              isRefreshFlow: true,
            };
          } catch (error) {
            console.error("Refresh flow error:", error);
            return null;
          }
        }

        // login logic
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
      if (account?.provider === "credentials" && user?.accessToken) {
        token.user = {
          ...user,
          provider: "credentials",
          provider_id: user.provider_id || user.id
        };
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + (23 * 60 * 60 * 1000);
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
        token.accessTokenExpires = Date.now() + (23 * 60 * 60 * 1000);
      }

      // Refresh logic
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        if (token.refreshToken) {
          const refreshedTokens = await refreshAccessToken(token.refreshToken);

          if (refreshedTokens) {
            // Updating tokens
            token.accessToken = refreshedTokens.accessToken;
            token.refreshToken = refreshedTokens.refreshToken;
            token.accessTokenExpires = Date.now() + (23 * 60 * 60 * 1000);

            if (refreshedTokens.user && Object.keys(refreshedTokens.user).length > 0) {
              token.user = { ...token.user, ...refreshedTokens.user };
            }
          } else {
            token.error = "RefreshAccessTokenError";
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      if (token?.accessToken) session.accessToken = token.accessToken;
      if (token?.refreshToken) session.refreshToken = token.refreshToken;
      if (token?.error) {
        session.error = token.error;
      }
      console.log("Session :: ", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});