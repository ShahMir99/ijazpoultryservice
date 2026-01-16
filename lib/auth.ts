import { User } from "@/database/models";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DbConnection } from "@/database/mongoose";
import { DefaultUser } from "next-auth";

interface CustomUser extends DefaultUser {
  id: string;
  userType: string;
  image?: string;
  address: string;
  phone: string;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await DbConnection();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const matchPassword = user.password === credentials.password;

        if (!matchPassword) throw new Error("Invalid credentials");

        // Explicitly cast to CustomUser
        return {
          id: user.id,
          name: user.name || "Default Name", // Ensure non-nullable
          email: user.email || "default@example.com", // Ensure non-nullable
          userType: user.userType,
          image: user.image,
          address: user.address || "Default Address", // Ensure non-nullable
          phone: user.phone || "Default Phone", // Ensure non-nullable
        } as CustomUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.name = customUser.name;
        token.email = customUser.email;
        token.userType = customUser.userType;
        token.image = customUser.image;
        token.address = customUser.address;
        token.phone = customUser.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        userType: token.userType,
        image: token.image,
        address: token.address,
        phone: token.phone,
      } as CustomUser;
      return session;
    },
  },
};
