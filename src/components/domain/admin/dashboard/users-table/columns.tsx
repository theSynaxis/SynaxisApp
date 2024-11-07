"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export type User = {
  id: string;
  role: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  patron: string;
  birthday: Date;
  nameday: Date;
  location: string;
  denomination: string;
  jurisdiction: string;
  sex: string;
  joinedDate: Date;
  updatedDate: Date;
  isBanned: boolean;
  isDeleted: boolean; // if true, don't show user - in fact, this should be in the retrieval code
  emailVerified: boolean;
};

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.accessor("username", {
    header: () => <div className="text-left text-base">User</div>,
    cell: (info) => {
      return (
        <Link href="/apps/sayings/app/saints/saint" className="text-base">
          {info.getValue()}
        </Link>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("role", {
    header: () => <div className="text-center text-base">User Role</div>,
    cell: (info) => {
      return <span className="text-base">{info.getValue()}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-center text-base">Actions</div>,
    cell: (info) => {
      const { username, role } = info.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Image
                src={"/images/icons/Dots-Vertical-Icon.svg"}
                alt={"Actions"}
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mr-2 bg-neutral-50">
            <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-900" />
            <Dialog>
              <DialogTrigger>
                <DropdownMenuItem
                  className="cursor-pointer text-base text-secondary-red-500"
                  onSelect={(e) => e.preventDefault()}
                >
                  Ban
                </DropdownMenuItem>
              </DialogTrigger>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
