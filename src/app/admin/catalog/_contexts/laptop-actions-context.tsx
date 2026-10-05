"use client";

import { createContext, useContext, useState } from "react";
import { Laptop } from "@/db/schema";

type LaptopActionsContextValue = {
  onEdit: (laptop: Laptop) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateLaptopSheetOpen: boolean;
  setIsCreateLaptopSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  laptopToDelete: Laptop | null;
  onDelete: (laptop: Laptop) => void;
};

const LaptopActionsContext = createContext<LaptopActionsContextValue | null>(
  null,
);

type Props = {
  children: React.ReactNode;
  onEdit: (laptop: Laptop) => void;
};

export function LaptopActionsProvider({ children, onEdit }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isCreateLaptopSheetOpen, setIsCreateLaptopSheetOpen] =
    useState<boolean>(false);
  const [laptopToDelete, setLaptopToDelete] = useState<Laptop | null>(null);

  const onDelete = (laptop: Laptop) => {
    setLaptopToDelete(laptop);
    setIsDeleteDialogOpen(true);
  };

  return (
    <LaptopActionsContext.Provider
      value={{
        onEdit,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isCreateLaptopSheetOpen,
        setIsCreateLaptopSheetOpen,
        laptopToDelete,
        onDelete,
      }}
    >
      {children}
    </LaptopActionsContext.Provider>
  );
}

export function useLaptopActions() {
  const ctx = useContext(LaptopActionsContext);
  if (!ctx)
    throw new Error(
      "useLaptopActions must be used inside LaptopActionsProvider",
    );
  return ctx;
}
