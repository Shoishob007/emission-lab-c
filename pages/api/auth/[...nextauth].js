import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
    // Optionally merge token into user if you want access in session/jwt
    return {
      ...data.user,
      accessToken: data.token?.access,
      refreshToken: data.token?.refresh,
    };
  }
  // Optional: throw an error with the message from API
  throw new Error(data.detail || "Login failed");
}
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
});