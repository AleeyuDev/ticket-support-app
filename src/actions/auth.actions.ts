"use server";

import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
// import {logEvent}  from "@/utils/sentry";
import { setAuthCookie, removeAuthCookie, signAuthToken } from "@/lib/auth";

type ResponseResult = {
  success: boolean;
  message: string;
};

//  Register a new user

export const registerUser = async (
  prevState: ResponseResult,
  formData: FormData
): Promise<ResponseResult> => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      // / logEvent(
      //     " Validation error: Missing  register failed "  , 'auth', {name, email}, 'warning'
      // )
      return { success: false, message: "All Field are required " };
    }

    // check exiting user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // logEvent(`Registration failed:  User Already exits  - ${email}`, "auth", { email }, 'warning')

      return { success: false, message: "User already exits " };
    }

    // hashed password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // sign and set auth token
    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    //   logEvent(`User registered successfully:` , 'auth', {userId: user.id, email}, 'info')
    return { success: true, message: "Registration  successfully " };
  } catch (error) {
    // logEvent("unexpected error during registration ", 'auth', {}, 'error', error)

    console.log(error);
    //   console.log("unexpected error during registration ", 'auth', {}, 'error', error)
    return {
      success: false,
      message: "Something went wrong, please try again ",
    };
  }
};

//  log user out  and remove auth cookies

export const logoutUser = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    await removeAuthCookie();
    // logEvent("User logged out successfully", 'auth', {} ,'info')
    return { success: true, message: "Logout Successful" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Logout failed. please try again" };

    // logEvent("unexpected  error during logout:", 'auth', {} ,'error', error)
  }
};

//   login user

export const loginUser = async (
  prevState: ResponseResult,
  formData: FormData
): Promise<ResponseResult> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      // / logEvent(
      //     " Validation error: Missing  login failed "  , 'auth', {name, email}, 'warning'
      // )
      return { success: false, message: "Email and password  required " };
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // console.log(user);

    if (!user || !user.password) {
      // logEvent(`Login Failed: not found   -- ${email} `, 'auth', {email} )
      return { success: false, message: "Invalid Email or Password " };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // logEvent(`Login Failed: Incorrect password   -- ${email} `, 'auth', {email} ,"waring" )
      console.log({ success: false, message: "Invalid email or Password " });
      return { success: false, message: "Invalid email or Password " };
    }

    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    return { success: true, message: "login successfully" };
  } catch (error) {
    console.log(error);

    // logEvent(`unexpected error during login   --  `, 'auth', {} ,"error", error )

    return { success: false, message: " Error during log in" };
  }
};
