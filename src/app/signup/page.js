"use client";

import Container from "@/components/header/Container";
import React from "react";
import signupImage from "@/../../public/assets/images/signupImage.png";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useFormik } from "formik";
import { useSignupMutation } from "@/features/authSlice/auth.slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const router = useRouter();
    const [signup, {isLoading: isSigning, isSuccess, isError }] = useSignupMutation();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            try {
                setSubmitting(true);
                const res = await signup(values);
                if(res.data.success) {
                    toast.success("Signed up successfully")
                    resetForm();
                    router.replace("/login");
                }
            } catch (error) {
                console.error("Unable to signup: ", error.message)
                toast.error("Unable to sign up")
            }
        }
    })
  return (
    <Container>
      <section className="relative backdrop-blur-2xl flex flex-wrap lg:min-h-[70dvh] lg:items-center border border-gray-500/50 rounded-xl overflow-hidden">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Shop with us at a great deal you will ever find elsewhere. We are
              the best clothing line in town with great fanbase, join now.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-[5px] border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter full name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />

                <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                  <MdOutlineDriveFileRenameOutline className="size-4 text-gray-400" />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-[5px] border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-[5px] border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
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
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-[5px] border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password again"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
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
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Already have an account?
                <Link className="underline" href="/login">
                  Log in
                </Link>
              </p>

              <button
                type="submit"
                className="inline-block rounded-[5px] bg-orange-500 hover:bg-orange-600 duration-200 px-5 py-3 text-sm font-medium text-white"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block relative h-[80dvh] w-full lg:w-1/2 ">
          <Image
            alt="image"
            src={signupImage}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </Container>
  );
};

export default SignupPage;
