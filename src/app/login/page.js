"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Container from "@/components/header/Container";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkDidUserLoggedin = async () => {
      if (session?.user) {
        router.replace("/products");
      }
      return null;
    };
    checkDidUserLoggedin();
  }, [router, session]);

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("Fill all inputs");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...formData,
      });
      if (result?.error) {
        toast.error(result.error);
      } else {
        router.replace("/shop");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className=" lg:grid grid-cols-12 w-full min-h-[70dvh] rounded-xl overflow-hidden border border-gray-500/50">
        <div className="left-side col-span-7 hidden h-full lg:inline-block">
          <div className="relative size-full">
            <Image
              src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="something"
              className="object-cover inset-0"
              fill
            />
          </div>
        </div>

        <div className="right-side col-span-5 min-h-[50dvh] border bg-white w-full">
          <div className="h-full w-full flex flex-col items-center justify-center gap-y-6 p-4">
            <div className="w-full px-8">
              <p className="text-md font-medium text-slate-500">Hello,</p>
              <p className="text-2xl font-semibold">Welcome to Login Page!</p>
            </div>

            <div className="w-full flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="border border-slate-500/[0.3] rounded-xl p-8 space-y-10 w-4/6"
              >
                <p className="font-medium  text-xl text-center">
                  Login your account
                </p>
                <div className="flex flex-col gap-y-4">
                  <div className="input-field">
                    <label className="block text-slate-600 font-medium text-sm">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        className="block border-b-2 border-gray-600/20 focus:outline-none p-2 w-full"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="input-field">
                    <label className="block text-slate-600  font-medium text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="block border-b-2 border-gray-600/20 focus:outline-none p-2 w-full"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="block mr-0 pr-0 text-sm font-medium text-end text-slate-500"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700 duration-200 text-white w-full py-2 rounded-[2px] disabled:bg-slate-600"
                    disabled={loading}
                  >
                    {loading ? "loading" : "Login"}
                  </button>
                  <p className="text-sm text-center">
                    {"Don't have an account? "}
                    <Link href="/signup" className="font-medium underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            <div className=" w-full flex flex-col items-center gap-y-4 pb-4">
              <p className="text-sm text-slate-500">or sign in with</p>
              <div className="w-full flex flex-col items-center gap-y-2">
                <button className="w-3/6 flex items-center justify-center gap-x-2 bg-black py-2 rounded-[3px] text-slate-200 hover:bg-orange-600 duration-200" onClick={() => signIn('google')}>
                  <FaGoogle className="text-xl" />
                  Sign in with Google
                </button>
                <button className="w-3/6 flex items-center justify-center gap-x-2 bg-black py-2 rounded-[3px] text-white hover:bg-orange-600 duration-200" onClick={() => signIn('github')}>
                  <FaGithub className="text-xl" />
                  Sign in with Github
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Login;
