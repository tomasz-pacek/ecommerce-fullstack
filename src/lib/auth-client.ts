import { createAuthClient } from "better-auth/react";
import { lastLoginMethodClient } from "better-auth/client/plugins";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL as string);

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL,
  plugins: [lastLoginMethodClient()],
});
