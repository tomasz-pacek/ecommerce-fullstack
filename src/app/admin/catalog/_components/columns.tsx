"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import { Laptop } from "@/db/schema";
import { formatPrice } from "@/lib/utils/format-price-";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLaptopActions } from "../_contexts/laptop-actions-context";
import Link from "next/link";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Laptop>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("title", {
    header: () => <div className="text-left uppercase">product</div>,
    cell: ({ row }) => {
      const title = String(row.getValue("title"));
      return <div className="text-left">{title}</div>;
    },
  }),

  columnHelper.accessor("priceCents", {
    header: ({ column }) => {
      return (
        <div className="text-center uppercase">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PRICE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const priceCents = parseInt(row.getValue("priceCents"));
      const price = formatPrice(priceCents);
      return <div className="text-center">{price}</div>;
    },
  }),
  columnHelper.accessor("quantity", {
    header: ({ column }) => {
      return (
        <div className="text-center uppercase">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STOCK
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const quantity = parseInt(row.getValue("quantity"));
      return <div className="text-center">{quantity}</div>;
    },
  }),
  columnHelper.accessor("isActive", {
    header: ({ column }) => {
      return (
        <div className="text-center uppercase">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STATUS
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isActive = Boolean(row.getValue("isActive"));
      return (
        <div className="text-center">
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Live" : "Hidden"}
          </Badge>
        </div>
      );
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => {
      return (
        <div className="text-center uppercase">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            UPDATED
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    sortFn: "datetime",
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"));
      return (
        <div className="text-center">
          {formatDistanceToNow(updatedAt, { addSuffix: true })}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  }),
]);

const ActionsCell = ({ row }: { row: { original: Laptop } }) => {
  const product = row.original;
  const { onEdit, onDelete } = useLaptopActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="h-8 w-8 p-0" />}
      >
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onEdit(product)}
        >
          <SquarePen className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href={`/products/${product.slug}`} target="_blank">
            See product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={() => onDelete(product)}
        >
          <Trash className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
