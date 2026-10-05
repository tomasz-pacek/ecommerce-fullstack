"use client";

import { DataTable } from "@/app/admin/catalog/_components/data-table";
import { columns } from "./columns";
import { Laptop } from "@/db/schema";
import { useState } from "react";
import EditLaptopSheet from "./edit-laptop-sheet";
import { LaptopActionsProvider } from "../_contexts/laptop-actions-context";
import LaptopDeleteDialog from "../../_components/_dialogs/laptop-delete-dialog";
import CreateLaptopSheet from "./create-laptop-sheet";

type Props = {
  laptops: Laptop[];
};

export default function CatalogContent({ laptops }: Props) {
  const [editingLaptop, setEditingLaptop] = useState<Laptop | null>(null);
  return (
    <LaptopActionsProvider onEdit={setEditingLaptop}>
      <div className="xs:px-0 container mx-auto px-4 py-12">
        <DataTable columns={columns} data={laptops} />
        <EditLaptopSheet
          laptop={editingLaptop}
          open={!!editingLaptop}
          onOpenChange={(open) => !open && setEditingLaptop(null)}
        />
        <CreateLaptopSheet />
        <LaptopDeleteDialog />
      </div>
    </LaptopActionsProvider>
  );
}
