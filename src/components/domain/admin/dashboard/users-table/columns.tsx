"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  AllCollections,
  CreateCollection,
} from "~/components/domain/sayings/user-actions/add-to-collection";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { USER_ROLES } from "~/lib/constants";
import { PromoteUser } from "../../admin-actions/promote-user";

export type User = {
  id: string;
  role: string;
  username: string;
  email: string;
  name: string;
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
    header: () => <div className="text-base">User</div>,
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
    header: () => <div className="text-base">User Role</div>,
    cell: (info) => {
      return <span className="text-base capitalize">{info.getValue()}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => <div className="text-base">Email</div>,
    cell: (info) => {
      return <span className="text-base">{info.getValue()}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("name", {
    header: () => <div className="text-base">Name</div>,
    cell: (info) => {
      const { firstName, lastName } = info.row.original;
      return (
        <span className="text-base">
          {firstName} {lastName}
        </span>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("joinedDate", {
    header: () => <div className="text-base">Joined Date</div>,
    cell: (info) => {
      const date = info.getValue();
      return <span className="text-base">{format(date, `d, MMM, yyyy`)}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("updatedDate", {
    header: () => <div className="text-base">Profile Last Updated</div>,
    cell: (info) => {
      const date = info.getValue();
      return <span className="text-base">{format(date, `d, MMM, yyyy`)}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("emailVerified", {
    header: () => <div className="text-base">Verified Email</div>,
    cell: (info) => {
      return (
        <span className="flex justify-center text-base">
          {info.getValue() ? (
            <>
              <Image
                src={"/images/icons/Check-Icon.svg"}
                alt={"Email Verified"}
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </>
          ) : (
            <>
              <Image
                src={"/images/icons/X-Icon.svg"}
                alt={"Email Verified"}
                width={32}
                height={32}
                className="h-8 w-8 text-secondary-red-500"
              />
            </>
          )}
        </span>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-center text-base">Actions</div>,
    cell: (info) => {
      const { username, role, id } = info.row.original;
      const userRolesArray = [
        {
          value: USER_ROLES.ADMINISTRATOR,
          label: USER_ROLES.ADMINISTRATOR,
        },
        {
          value: USER_ROLES.MODERATOR,
          label: USER_ROLES.MODERATOR,
        },
        {
          value: USER_ROLES.USER,
          label: USER_ROLES.USER,
        },
      ];

      return (
        <span className="flex flex-row justify-center self-center">
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
            <DropdownMenuContent align="start" className="mr-2 bg-neutral-50">
              <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem
                    className="cursor-pointer text-base"
                    onSelect={(e) => e.preventDefault()}
                  >
                    Promote
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Promote/Demote User</DialogTitle>
                    <DialogDescription className="flex flex-col gap-4 pt-4">
                      <div className="flex w-full flex-col items-start justify-center">
                        <span className="flex w-full flex-row items-center justify-between p-0 text-lg">
                          {username}
                          <span>Current Role: {role}</span>
                        </span>
                      </div>
                      <PromoteUser userId={id} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
              <DropdownMenuSeparator className="bg-neutral-900" />
              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem
                    className="cursor-pointer text-base text-secondary-red-700"
                    onSelect={(e) => e.preventDefault()}
                  >
                    DELETE
                  </DropdownMenuItem>
                </DialogTrigger>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      );
    },
  }),
];
