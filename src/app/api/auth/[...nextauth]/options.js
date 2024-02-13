import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/src/app/models/user";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: {
          label: "user:",
          type: "text",
          placeholder: "Enter Username",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      async authorize(credentials, req) {
        try {
          console.log("Received credentials:", credentials);

          const foundUser = await User.findOne({ name: credentials.user })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              foundUser["role"] = "Unverified Email";

              // Redirect to "/image" after successful authentication
              return Promise.resolve("/image");
            }
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
        }
        console.log("Authorization failed");
        return Promise.resolve(null);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
