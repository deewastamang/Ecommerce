import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "pasword",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const dummyUser = {
            id: "199",
            name: "deewas tamang",
            password: "ddd",
          };
          if (
            credentials?.username === dummyUser.name &&
            credentials?.password === dummyUser.password
          ) {
            return dummyUser;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  //   error: "/error",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  sessoin: {
    strategy: "jwt",
  },
  jwt: {
    encryption: false,
  },
  // callbacks: {
    
  // }
};
