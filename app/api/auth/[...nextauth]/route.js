import User from "@models/user";
import { connectToDB } from "@utils/database";
import { GOOGLE_CLIENT_SECRET, GOOGLE_ID } from "@utils/secrets";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.is = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("🚀 ~ signIn ~ error:", error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
