"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export type Payment = {
  id: string;
  icon: string;
  name: string;
  quote: string;
};

const columnHelper = createColumnHelper<Payment>();

export const columns = [
  columnHelper.accessor("icon", {
    cell: (info) => {
      return (
        <>
          <Avatar>
            <AvatarImage asChild src={info.getValue()}>
              <Image
                src={info.getValue()}
                alt={`${info.row.original.name[0]}`}
                width={40}
                height={40}
              />
            </AvatarImage>
            {/* fallback AND ALT should be the first letter of the saint name */}
            <AvatarFallback>{info.row.original.name[0]}</AvatarFallback>
          </Avatar>
        </>
      );
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("quote", {
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
];
