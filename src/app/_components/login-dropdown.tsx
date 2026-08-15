"use client";

import ActionButton from "@/components/shared/action-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/types/auth";
import { ArrowRight, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  session: Session;
};

export default function LoginDropdown({ session }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          const errorMessage =
            ctx instanceof Error ? ctx.error.message : "Something went wrong";
          toast.add({
            title: errorMessage,
            type: "error",
          });
        },
      },
    });
  };

  if (!session) {
    return (
      <ActionButton
        onClick={() => router.push("/login")}
        className="group text-foreground relative overflow-hidden rounded-4xl bg-transparent px-8 shadow-[inset_0_0_0_1px_currentColor] hover:bg-transparent"
      >
        <span className="bg-foreground absolute -inset-px z-0 origin-right scale-x-0 rounded-4xl transition-transform duration-300 ease-out group-hover:scale-x-100" />

        <span className="group-hover:text-background relative z-10 flex items-center gap-2 transition-colors duration-300">
          Login
          <ArrowRight />
        </span>
      </ActionButton>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-ring cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
          <User size={20} aria-hidden="true" />
        </div>

        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-42">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-foreground truncate text-sm">
            {`${session.user.name} ${session.user.lastName}`}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
