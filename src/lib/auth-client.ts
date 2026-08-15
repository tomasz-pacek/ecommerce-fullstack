import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL as string);

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL,
  plugins: [lastLoginMethodClient(), inferAdditionalFields<typeof auth>()],
});

//inferAdditionalFields required for the authClient.signUp.email otherwise it doesn't know about lastName in the additional fields
