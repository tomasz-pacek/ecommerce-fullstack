import { Suspense } from "react";
import CompleteContent from "./components/complete-content";

type Props = {
  searchParams: Promise<{ payment_intent?: string }>;
};

export default function CompletePage({ searchParams }: Props) {
  return (
    <Suspense>
      <CompleteContent searchParams={searchParams} />
    </Suspense>
  );
}
