import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User2 from "@/models/User2";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(Credentials, res) {
        const { email, password } = Credentials;

        try {
          await connectDB();
        } catch (err) {
          throw new Error("Error in connecting to DB");
        }
        if (!email || !password) {
          throw new Error("Invalid Data");
        }
        const user2 = await User2.findOne({ email: email });
        if (!user2) throw new Error("User doesn't exist");

        const isValid = await verifyPassword(password, user2.password);
        if (!isValid) throw new Error("Username or password is incorrrect");
        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
