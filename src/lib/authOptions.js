import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./dbConnection";
import { UserModel } from "./models/userModel";
import { login } from "@/helper";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 20000,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 20000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "pasword",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          if (user) {
            return user; // user container user object form database
          } else {
            throw new Error("Not a register user. Sign up first.");
          }
        } catch (error) {
          const errorMessage = error.message || "Login failed"; //error message thrown from login() fuction
          const modifiedError = new Error(errorMessage);
          modifiedError.code = error.code; // Preserve custom error code if present
          throw modifiedError;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", //will redirect user to login page if not authenticated while visiting protected route
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: true,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("user email is ", user.email);
      if (account.provider == "google" || account.provider == "github") {
        try {
          await connectToDb();
          const checkUser = await UserModel.findOne({ email: user?.email });
          if (checkUser) {
            console.log(`Welcome back ${user?.name}`);
            return true;
          } else {
            const newUser = new UserModel({
              name: user?.name,
              email: user?.email,
              img: user?.image,
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.error("SignIn error:", error.message); // more specific logging
          return false;
        }
      }
      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.jti;
      return session;
    },
    // not working
    // async authorized({ auth, request }) {
    //   console.log(
    //     "auth of user is ",
    //     auth,
    //     " and requrest from authorized function i s ",
    //     request
    //   );
    //   return true;
    // },
  },
};
