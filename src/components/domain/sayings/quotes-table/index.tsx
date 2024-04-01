"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  type Payment,
  columns,
} from "~/components/domain/sayings/quotes-table/columns";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const data: Payment[] = [
  {
    id: "728ed52f",
    icon: "/images/saints/St-Silouan-Athonite.jpg",
    name: "Silouan the Athonite",
    quote:
      "In church I was listening to a reading from the Prophet Isaiah, and at the words, “Wash you make you clean,” I reflected, “Maybe the Mother of God sinned at one time or another, if only in thought.” And, marvelous to relate, in unison with my prayer a voice sounded in my heart, saying clearly, “The Mother of God never sinned even in thought.” Thus did the Holy Spirit bear witness in my heart to her purity.",
    work: {
      title: "Saint Silouan the Athonite",
      cover: "/images/books/new-edition-st-silouan.jpg",
    },
  },
];

const createFakeSaints = () => {
  const saint = faker.person.firstName();

  return {
    id: faker.string.uuid(),
    icon: "/images/saints/St-Silouan-Athonite.jpg",
    name: `St ${saint}`,
    quote: faker.lorem.sentence(),
    work: {
      title: "Saint Silouan the Athonite",
      cover: "/images/books/new-edition-st-silouan.jpg",
    },
  };
};

for (let index = 0; index < 4; index++) {
  data.push(createFakeSaints());
}

export default function QuotesTable() {
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="w-full rounded-md border border-neutral-900 shadow-lg">
      <div className="flex w-full flex-row items-center justify-between border-b border-neutral-900 p-4">
        <span>Search Form Goes Here</span>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="cursor-pointer">Columns</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-50">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <span>Link to open advanced search modal</span>
      </div>
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 border-t border-neutral-900 p-4">
        <Link
          className="flex flex-row items-start justify-end"
          href="/apps/sayings/app/submit-quote"
        >
          <Button>Submit Quote</Button>
        </Link>
      </div>
    </div>
  );
}
