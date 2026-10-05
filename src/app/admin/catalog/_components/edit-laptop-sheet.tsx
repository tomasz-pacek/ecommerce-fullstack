"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Laptop } from "@/db/schema";
import EditLaptopForm from "./edit-laptop-form";
import ActionButton from "@/components/shared/action-button";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useTransition } from "react";

type Props = {
  laptop: Laptop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditLaptopSheet({ laptop, open, onOpenChange }: Props) {
  const [isPending, startTransition] = useTransition(); //save changes button transition
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="overflow-y-auto data-[side=right]:sm:max-w-xl"
        showCloseButton={false}
      >
        <SheetHeader className="flex w-full flex-row items-center justify-between">
          {laptop && <span>{laptop.title}</span>}
          <SheetClose render={<Button variant={"ghost"} size={"icon-sm"} />}>
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        {laptop && (
          <EditLaptopForm
            laptop={laptop}
            startTransition={startTransition}
            onSuccess={() => onOpenChange(false)}
          />
        )}
        <SheetFooter className="bg-popover sticky bottom-0 flex w-full flex-row items-center justify-end border-t">
          <ActionButton
            type="button"
            variant={"outline"}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </ActionButton>
          <ActionButton
            type="submit"
            form="edit-laptop-form"
            disabled={isPending}
            isPending={isPending}
            loadingSpinner
          >
            Save changes
          </ActionButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
