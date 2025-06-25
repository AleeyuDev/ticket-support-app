import { verifyAuthToken, getAuthCookie } from "./auth";
import { prisma } from "@/db/prisma";

type AuthPayload = {
  userId: string;
};

export const dynamic = "force-dynamic";

// ...existing code...

export const getCurrentUser = async () => {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    const payload = (await verifyAuthToken(token)) as AuthPayload | null;
    if (!payload || !payload.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) return null;
    return user;
  } catch (error) {
    console.log("Error getting the current user", error);
    return null;
  }
};
