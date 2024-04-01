"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  type Table as TableType,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  type Payment,
  columns,
} from "~/components/domain/sayings/quotes-table/columns";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Image from "next/image";

const data: Payment[] = [
  {
    id: "728ed52f",
    icon: "/images/saints/St-Silouan-Athonite.jpg",
    saint: "Silouan the Athonite",
    quote:
      "In church I was listening to a reading from the Prophet Isaiah, and at the words, “Wash you make you clean,” I reflected, “Maybe the Mother of God sinned at one time or another, if only in thought.” And, marvelous to relate, in unison with my prayer a voice sounded in my heart, saying clearly, “The Mother of God never sinned even in thought.” Thus did the Holy Spirit bear witness in my heart to her purity.",
    source: {
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
    saint: `St ${saint}`,
    quote: faker.lorem.sentence(),
    source: {
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
  // for client side data filtering. ideal would be server side filtering.
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full rounded-md border border-neutral-900 shadow-lg">
      <div className="flex w-full flex-row items-start justify-between border-b-2 border-secondary-red-500 bg-neutral-900 p-4 text-lg uppercase text-primary-gold-400">
        <ColumnVisibilityActions table={table} />
        <SearchQuotes table={table} />
        {/* <span>Link to open advanced search modal</span> */}
      </div>
      <Table className="w-full">
        <TableHeader className="">
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-2xl"
              >
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

function SearchQuotes(props: { table: TableType<Payment> }) {
  const { table } = props;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex cursor-pointer flex-row items-center justify-between gap-2">
            Search
            <Image
              src={"/images/icons/Chevron-Down-Gold-Icon.svg"}
              alt="Column Visibility"
              width={12}
              height={12}
              className="h-3 w-3"
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col items-start gap-4 bg-neutral-50 px-4 py-6"
        >
          <span className="gap-4">
            By Quote:
            <Input
              placeholder="Filter quotes..."
              value={
                (table.getColumn("quote")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("quote")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </span>
          <span className="gap-4">
            By Saint:
            <Input
              placeholder="Filter saints..."
              value={
                (table.getColumn("saint")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("saint")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </span>
          <span className="gap-4">
            By Source:
            <Input
              placeholder="Filter sources..."
              value={
                (table.getColumn("source")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("source")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </span>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ColumnVisibilityActions(props: { table: TableType<Payment> }) {
  const { table } = props;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex cursor-pointer flex-row items-center justify-between gap-2">
            Columns
            <Image
              src={"/images/icons/Chevron-Down-Gold-Icon.svg"}
              alt="Column Visibility"
              width={12}
              height={12}
              className="h-3 w-3"
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-neutral-50">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
