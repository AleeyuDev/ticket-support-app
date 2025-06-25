"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/router";
import { loginUser } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(loginUser, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Login successful");
      router.push("/tickets");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-orange-50 px-x">
        <div className="w-ful max-w-md bg-white shadow-md rounded-lg p-8  border border-gray-200">
          <h1 className="text-3xl font-bold mb-5 text-center text-orange-500">
            Login
          </h1>

          {/* {state.success ? (
            <p className="text-green-700 text-center mb-4"> {state.success} </p>
          ) : (
            <p className="text-red-700 text-center mb-4"> {state.message} </p>
          )}
           {state.message && (
            <p className="text-red-700 text-center mb-4"> {state.message} </p>
          )}  */}

          {/* {(state.success && (
            <p className="text-green-700 text-center mb-4"> {state.success} </p>
          )) ||
            (state.message && (
              <p className="text-red-700 text-center mb-4"> {state.message} </p>
            ))} */}

          <form action={formAction} className="space-y-4 text-gray-700">
            <input
              className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="text"
              name="email"
              placeholder="Your Email"
              autoComplete="email"
              required
            />
            <input
              className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="text"
              name="password"
              placeholder="password"
              autoComplete="new-password"
              required
            />
            <button
              className="-
            w-full bg-orange-500 text-white p-3  cursor-pointer rounded hover:bg-orange-600 transition disabled:opacity-50">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
