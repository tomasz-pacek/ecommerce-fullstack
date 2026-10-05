"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLaptopActions } from "../../catalog/_contexts/laptop-actions-context";
import { useState, useTransition } from "react";
import { deleteLaptop } from "@/actions/admin-catalog";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/shared/action-button";

export default function LaptopDeleteDialog() {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, laptopToDelete } =
    useLaptopActions();
  const [confirmText, setConfirmText] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const canDelete = confirmText === "delete";

  const handleDelete = () => {
    startTransition(async () => {
      if (!laptopToDelete || !canDelete) return;
      const result = await deleteLaptop(laptopToDelete.id);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        setConfirmText("");
        toast.add({
          title: "You have deleted the laptop.",
          type: "success",
        });
      } else {
        toast.add({
          title: result.error || "Something went wrong",
          type: "error",
        });
      }
    });
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            You are about to delete{" "}
            <span className="text-foreground">{laptopToDelete?.title}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2">
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder='Type in "delete" '
          />
          <ActionButton
            variant="destructive"
            disabled={!canDelete || isPending}
            isPending={isPending}
            loadingSpinner
            onClick={handleDelete}
          >
            Delete laptop
          </ActionButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
