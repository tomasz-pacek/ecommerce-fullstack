import { Suspense, ViewTransition } from "react";
import CustomersContent from "./_components/customers-content";

export default async function AdminCustomersPage() {
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <Suspense>
        <CustomersContent />
      </Suspense>
    </ViewTransition>
  );
}
