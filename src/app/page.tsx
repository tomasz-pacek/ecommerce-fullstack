import { Suspense, ViewTransition } from "react";
import HeaderServer from "./_components/header-server";
import HomeContent from "./_components/home/home-content";

export default function Home() {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <div className="min-h-screen">
        <Suspense>
          <HeaderServer />
        </Suspense>

        <HomeContent />
      </div>
    </ViewTransition>
  );
}
