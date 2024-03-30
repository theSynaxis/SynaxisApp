"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export type Payment = {
  id: string;
  icon: string;
  name: string;
  quote: string;
  work: {
    title: string;
    cover: string;
  };
};

const columnHelper = createColumnHelper<Payment>();

export const columns = [
  columnHelper.accessor("icon", {
    header: () => <></>,
    cell: (info) => {
      return (
        <Link href="/apps/sayings/app/saints/saint">
          <Avatar>
            <AvatarImage asChild src={info.getValue()}>
              <Image
                src={info.getValue()}
                alt={`${info.row.original.name[0]}`}
                width={40}
                height={40}
              />
            </AvatarImage>
            <AvatarFallback>{info.row.original.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("name", {
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
  columnHelper.accessor("work", {
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
