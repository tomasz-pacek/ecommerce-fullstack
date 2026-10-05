import { ViewTransition } from "react";

export default function AdminPage() {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <div className="h-screen w-full">siema</div>
      <div className="h-screen w-full">siema2</div>
    </ViewTransition>
  );
}
