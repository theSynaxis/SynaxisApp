"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

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
            <div
              className="my-2 rounded-full bg-success-green-600 px-2 py-1 text-center text-base text-neutral-900"
              key={i}
            >
              {cat}
            </div>
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
];
