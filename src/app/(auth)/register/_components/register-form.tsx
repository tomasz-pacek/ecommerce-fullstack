"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { registerFormSchema } from "@/lib/validations/register-form-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    const { name, lastName, email, password } = data;
    await authClient.signUp.email(
      {
        name,
        lastName,
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/");
          toast.add({
            title: "You've successfully registered",
            type: "success",
          });
          setIsLoading(false);
        },
        onError: (ctx) => {
          console.log(ctx);
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
      <FieldGroup className="gap-6 font-medium">
        <div className="flex items-center justify-center gap-4">
          <RHFField form={form} name="name">
            {(field) => (
              <Input
                {...field}
                placeholder="Name"
                className="bg-input border-none py-5"
              />
            )}
          </RHFField>
          <RHFField form={form} name="lastName">
            {(field) => (
              <Input
                {...field}
                placeholder="Last name"
                className="bg-input border-none py-5"
              />
            )}
          </RHFField>
        </div>
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
                className="cursor-pointer"
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
        Register
      </ActionButton>
    </form>
  );
}
