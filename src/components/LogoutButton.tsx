"use client";
import { useActionState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/auth.actions";

import { toast } from "sonner";


export const dynamic = "force-dynamic";

// ...existing code...

const LogoutButton = () => {
  // const router = useRouter();

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(logoutUser, initialState);
  useEffect(() => {
    if (state.success) {
      toast.success("Logout successful");
      // router.push("/login");
      // router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <button
          type="submit"
          className=" cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Logout
        </button>
      </form>
    </>
  );
};

export default LogoutButton;
