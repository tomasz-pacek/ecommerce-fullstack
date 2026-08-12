"use client";

import * as React from "react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { Spinner } from "../ui/spinner";

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isPending?: boolean;
    pendingText?: string | null;
    loadingSpinner?: boolean;
    children: React.ReactNode;
  };

export default function ActionButton({
  children,
  isPending,
  pendingText,
  loadingSpinner,
  disabled,
  ...props
}: Props) {
  return (
    <Button disabled={disabled || isPending} {...props}>
      {isPending ? (
        <>
          {loadingSpinner && <Spinner />}
          {pendingText ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
