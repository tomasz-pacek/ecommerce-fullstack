import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getAuthHeaders() {
  const headersList = await headers();
  const headersObj = new Headers();

  headersList.forEach((value, key) => {
    headersObj.append(key, value);
  });

  return headersObj;
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await getAuthHeaders(),
  });

  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user;
}

export async function getCurrentSession() {
  const session = await auth.api.getSession({
    headers: await getAuthHeaders(),
  });

  return session;
}
