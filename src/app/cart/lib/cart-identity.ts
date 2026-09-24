import { getCurrentSession } from "@/lib/auth-utils";
import { cookies } from "next/headers";

const GUEST_COOKIE = "guest_id";
const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; //90 dni

export const getCartIdentity = async () => {
  const session = await getCurrentSession();

  if (session?.user) {
    return {
      userId: session.user.id as string | null,
      guestId: null as string | null,
    };
  }

  const cookieStore = await cookies();
  const guestId = cookieStore.get(GUEST_COOKIE)?.value ?? null;

  return { userId: null as string | null, guestId };
};

export const getOrCreateCartIdentity = async () => {
  const session = await getCurrentSession();

  if (session?.user) {
    return { userId: session.user.id, guestId: null as string | null };
  }

  const cookieStore = await cookies();
  let guestId = cookieStore.get(GUEST_COOKIE)?.value;

  if (!guestId) {
    guestId = crypto.randomUUID();
    cookieStore.set(GUEST_COOKIE, guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: GUEST_COOKIE_MAX_AGE,
      path: "/",
    });
  }

  return { userId: null as string | null, guestId };
};
