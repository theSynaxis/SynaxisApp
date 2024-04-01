"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
  AllCollections,
  CreateCollection,
} from "../user-actions/add-to-collection";

export type Payment = {
  id: string;
  icon: string;
  saint: string;
  quote: string;
  source: {
    title: string;
    cover: string;
  };
  categories: string[];
  tags: string[];
};

const columnHelper = createColumnHelper<Payment>();

export const columns = [
  columnHelper.accessor("icon", {
    header: () => <div className="text-left text-base">Icon</div>,
    cell: (info) => {
      return (
        <Link href="/apps/sayings/app/saints/saint">
          <Avatar>
            <AvatarImage asChild src={info.getValue()}>
              <Image
                src={info.getValue()}
                alt={`${info.row.original.saint[0]}`}
                width={40}
                height={40}
              />
            </AvatarImage>
            <AvatarFallback className="text-2xl">
              {info.row.original.saint[0]}
            </AvatarFallback>
          </Avatar>
        </Link>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("saint", {
    header: () => <div className="text-left text-base">Saint</div>,
    cell: (info) => {
      return (
        <Link href="/apps/sayings/app/saints/saint" className="text-base">
          {info.getValue()}
        </Link>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("quote", {
    header: () => <div className="text-center text-base">Saying</div>,
    cell: (info) => {
      return <span className="text-base">{info.getValue()}</span>;
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("categories", {
    header: () => <div className="text-center text-base">Categories</div>,
    cell: (info) => {
      const cats = info.getValue();
      return (
        <div>
          {cats.map((cat, i) => (
            <Link href="/apps/sayings/app/categories/category" key={i}>
              <div className="my-2 rounded-full bg-success-green-600 px-2 py-1 text-center text-base text-neutral-900">
                {cat}
              </div>
            </Link>
          ))}
        </div>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("tags", {
    header: () => <div className="text-center text-base">Tags</div>,
    cell: (info) => {
      const tags = info.getValue();
      return (
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Link href="/apps/sayings/app/tags/tag" key={i}>
              <div
                className="my-2 text-center text-base text-neutral-900"
                key={i}
              >
                {tag}
              </div>
            </Link>
          ))}
        </div>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("source", {
    header: () => <div className="text-center text-base">Source</div>,
    cell: (info) => {
      return (
        <Link href="/apps/sayings/app/works/work">
          <Image
            src={info.getValue().cover}
            alt={info.getValue().title}
            width={40}
            height={40}
          />
        </Link>
      );
    },
    footer: (props) => props.column.id,
  }),
  {
    id: "actions",
    header: () => <div className="text-center text-base">Actions</div>,
    cell: (info) => {
      const { quote } = info.row.original;

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
            <DropdownMenuItem
              className="cursor-pointer text-base"
              onClick={() => navigator.clipboard.writeText(quote)}
            >
              Copy quote
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-900" />
            <Dialog>
              <DialogTrigger>
                <DropdownMenuItem
                  className="cursor-pointer text-base"
                  onSelect={(e) => e.preventDefault()}
                >
                  Add To Collection
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Quote To Collection</DialogTitle>
                  <DialogDescription className="flex flex-col gap-4">
                    <AllCollections />
                    <CreateCollection />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {/* <DropdownMenuSeparator className="bg-neutral-900" /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
