import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod } from "better-auth/plugins";
import * as schema from "@/db/schema";
import { updateTag } from "next/cache";

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
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async () => {
          updateTag("admin-customers"); //update cache tag to revalidate customers in admin panel
        },
      },
    },
  },

  plugins: [lastLoginMethod(), nextCookies()],
});
