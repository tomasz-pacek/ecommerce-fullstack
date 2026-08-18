import { Suspense, ViewTransition } from "react";
import HeaderServer from "./_components/header-server";

export default function Home() {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <div className="min-h-screen">
        <Suspense>
          <HeaderServer />
        </Suspense>
        <div className="h-screen w-full">czesc</div>
        <div className="h-screen w-full">czesc2</div>
        <div className="h-screen w-full">czesc3</div>
      </div>
    </ViewTransition>
  );
}
