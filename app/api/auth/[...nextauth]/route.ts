import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectMongoDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/user";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          throw new Error("Email and password required");
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          console.log(user);
          return passwordsMatch ? user : null;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authorization",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
