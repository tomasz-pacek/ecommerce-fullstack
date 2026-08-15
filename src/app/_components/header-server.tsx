import { getCurrentSession } from "@/lib/auth-utils";
import HeaderClient from "./header-client";

export default async function HeaderServer() {
  const session = await getCurrentSession();
  return <HeaderClient session={session} />;
}
