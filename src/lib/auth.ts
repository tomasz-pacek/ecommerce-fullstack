import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod } from "better-auth/plugins";
import * as schema from "@/db/schema";
import { cookies } from "next/headers";
import { mergeGuestCartIntoUser } from "@/app/cart/lib/cart-merge";

const GUEST_COOKIE = "guest_id";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      lastName: {
        type: "string",
        required: true,
      },
    },
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          const cookieStore = await cookies();
          const guestId = cookieStore.get(GUEST_COOKIE)?.value;

          if (guestId) {
            await mergeGuestCartIntoUser(guestId, session.userId);
            cookieStore.delete(GUEST_COOKIE);
          }
        },
      },
    },
  },
  plugins: [lastLoginMethod(), nextCookies()],
});
