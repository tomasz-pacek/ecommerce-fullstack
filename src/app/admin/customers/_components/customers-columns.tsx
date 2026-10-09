"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "../../../../components/shared/data-table-features";
import { User } from "@/db/schema";
import { getInitials } from "@/lib/utils/get-initials";
import {
  MailCheck,
  MailWarning,
  User as UserIcon,
  UserShield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// type User = {
//     id: string;
//     name: string;
//     lastName: string;
//     email: string;
//     emailVerified: boolean;
//     image: string | null;
//     createdAt: Date;
//     updatedAt: Date;
//     stripeCustomerId: string | null;
//     role: "user" | "admin" | null;
// }

const columnHelper = createColumnHelper<DataTableFeatures, User>();

export const customerColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "CUSTOMER",
    cell: ({ row }) => {
      const { name, lastName, email } = row.original;
      const customerInitials = getInitials(name, lastName);

      return (
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="bg-secondary flex size-8 items-center justify-center rounded-full text-xs">
            {customerInitials}
          </div>

          <div className="flex flex-col items-start justify-center">
            <p className="text-foreground">
              {name} {lastName}
            </p>
            <p className="text-muted-foreground text-xs">{email}</p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("role", {
    header: "ROLE",
    cell: ({ row }) => {
      const { role } = row.original;
      return <CustomerRoleBadge role={role} />;
    },
  }),
  columnHelper.accessor("emailVerified", {
    header: "EMAIL STATUS",
    cell: ({ row }) => {
      const { emailVerified } = row.original;
      return <CustomerEmailVerifiedBadge isEmailVerified={emailVerified} />;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "JOINED",
    cell: ({ row }) => {
      const joinedDate = new Date(row.getValue("createdAt")).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "short", year: "numeric" },
      );
      return <div>{joinedDate}</div>;
    },
  }),
]);

const CustomerEmailVerifiedBadge = ({
  isEmailVerified,
}: {
  isEmailVerified: boolean;
}) => {
  return (
    <Badge
      className={cn(
        "min-w-24 gap-1.5 rounded-sm border",
        isEmailVerified
          ? "border-emerald-300/50 bg-emerald-300/20 text-emerald-300"
          : "border-amber-300/50 bg-amber-300/20 text-amber-300",
      )}
    >
      {isEmailVerified ? <MailCheck /> : <MailWarning />}{" "}
      {isEmailVerified ? "Verified" : "Pending"}
    </Badge>
  );
};

const CustomerRoleBadge = ({ role }: { role: "admin" | "user" | null }) => {
  return (
    <Badge
      className={cn(
        "min-w-20 gap-1.5 rounded-sm border capitalize",
        role === "admin" && "bg-primary/20 text-primary border-primary/50",
        role === "user" &&
          "border-emerald-300/50 bg-emerald-300/20 text-emerald-300",
        role === null && "bg-secondary/20 text-secondary border-secondary/50",
      )}
    >
      {role === "admin" ? (
        <UserShield />
      ) : role === "user" ? (
        <UserIcon />
      ) : null}
      {role ?? "Empty"}
    </Badge>
  );
};
