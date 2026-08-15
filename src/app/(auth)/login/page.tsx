import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewTransition } from "react";
import LoginForm from "./_components/login-form";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session) redirect("/");
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-foreground font-medium underline"
              >
                Sign up
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </ViewTransition>
  );
}
