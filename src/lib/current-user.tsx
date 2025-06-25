import { verifyAuthToken, getAuthCookie } from "./auth";
import { prisma } from "@/db/prisma";

type AuthPayload = {
  userId: string;
};

// export const signAuthToken =  (payload: any ) => {}

export const getCurrentUser = async () => {
  try {
    const token = await getAuthCookie();
    if (!token) return null;
    const payload = (await verifyAuthToken(token)) as AuthPayload;

    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Error geting the current user ", error);
    return null;
  }
};
