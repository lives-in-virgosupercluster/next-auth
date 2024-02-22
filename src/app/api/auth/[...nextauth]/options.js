import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/src/app/models/user";
import bcrypt from "bcrypt";

export const options = {
  pages: {
    signIn: "/login",
    signOut:"/login"
  },
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Username", type: "text", placeholder: "Enter Username" },
        password: { label: "Password", type: "password", placeholder: "Enter Your Password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("Received credentials:", credentials);

          const foundUser = await User.findOne({ name: credentials.username }).lean().exec();
        

          if (foundUser) {
            console.log("User Exists");
            const isPasswordValid = await bcrypt.compare(credentials.password, foundUser.password);

            if (isPasswordValid) {
              console.log("Good Password");
              delete foundUser.password;

              // Redirect to "/image" after successful authentication
              return Promise.resolve(foundUser);
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
      if (user) {
        token.role = user.role;
        token.id = user._id; // Optionally include user ID in the token
      }
      //console.log(user, token, "token");
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
};
