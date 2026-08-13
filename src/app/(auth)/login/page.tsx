import { ViewTransition } from "react";

export default function LoginPage() {
  return (
    <ViewTransition
      default="none"
      enter="fade-in"
      exit="fade-out"
    ></ViewTransition>
  );
}
