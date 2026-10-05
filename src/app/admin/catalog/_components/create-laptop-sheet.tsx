"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { useLaptopActions } from "../_contexts/laptop-actions-context";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateLaptopForm from "./create-laptop-form";
import { useTransition } from "react";
import ActionButton from "@/components/shared/action-button";

export default function CreateLaptopSheet() {
  const [isPending, startTransition] = useTransition(); //create new laptop button
  const { isCreateLaptopSheetOpen, setIsCreateLaptopSheetOpen } =
    useLaptopActions();
  return (
    <Sheet
      open={isCreateLaptopSheetOpen}
      onOpenChange={setIsCreateLaptopSheetOpen}
    >
      <SheetContent
        className="overflow-y-auto data-[side=right]:sm:max-w-xl"
        showCloseButton={false}
      >
        <SheetHeader className="flex w-full flex-row items-center justify-between">
          <span className="text-base font-medium">
            Fill the form and create new laptop
          </span>
          <SheetClose render={<Button variant={"ghost"} size={"icon-sm"} />}>
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <CreateLaptopForm startTransition={startTransition} />
        <SheetFooter className="bg-popover sticky bottom-0 flex w-full flex-row items-center justify-end border-t">
          <ActionButton type="button" variant={"outline"}>
            Cancel
          </ActionButton>
          <ActionButton
            type="submit"
            form="create-laptop-form"
            disabled={isPending}
            isPending={isPending}
            loadingSpinner
          >
            Create new laptop
          </ActionButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
