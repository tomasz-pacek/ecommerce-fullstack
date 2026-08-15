"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/validations/login-form-schema";
import RHFField from "@/components/shared/rhf-field";
import { Input } from "@/components/ui/input";
import { FieldGroup } from "@/components/ui/field";
import ActionButton from "@/components/shared/action-button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    const { email, password } = data;
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
          toast.add({
            title: "You have successfully logged in!",
            type: "success",
          });
        },
        onError: (ctx) => {
          const errorMessage =
            ctx instanceof Error ? ctx.error.message : "Something went wrong";
          toast.add({
            title: errorMessage,
            type: "error",
          });
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-6">
        <RHFField form={form} name="email">
          {(field) => (
            <Input
              {...field}
              placeholder="Email"
              className="bg-input border-none py-5"
            />
          )}
        </RHFField>
        <RHFField form={form} name="password">
          {(field) => (
            <InputGroup className="bg-input border-none py-5">
              <InputGroupInput
                {...field}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
              />
              <InputGroupAddon
                align={"inline-end"}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="mr-2 cursor-pointer"
              >
                {isPasswordVisible ? <EyeClosed /> : <Eye />}
              </InputGroupAddon>
            </InputGroup>
          )}
        </RHFField>
      </FieldGroup>
      <ActionButton
        type="submit"
        className="mt-6 w-full py-5 text-base font-medium"
        isPending={isLoading}
        disabled={isLoading}
        loadingSpinner
      >
        Login
      </ActionButton>
    </form>
  );
}
