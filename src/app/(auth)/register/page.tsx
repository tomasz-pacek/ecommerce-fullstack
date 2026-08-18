import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense, ViewTransition } from "react";
import RegisterForm from "./_components/register-form";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

const RegisterContent = async () => {
  const session = await getCurrentSession();
  if (session) redirect("/");
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Already have an account?{" "}
          <Link href="/login" className="text-foreground font-medium underline">
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default async function RegisterPage() {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <Suspense fallback={null}>
          <RegisterContent />
        </Suspense>
      </div>
    </ViewTransition>
  );
}
