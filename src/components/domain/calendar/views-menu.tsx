"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

type Class = string | boolean | undefined;

function classNames(...classes: Class[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewsMenu() {
  return (
    <>
      <DropdownMenu
      //  className="relative"
      >
        <DropdownMenuTrigger
          type="button"
          className="flex items-center rounded-md border border-neutral-900 py-2 pl-3 pr-2 font-medium text-neutral-700 shadow-sm hover:text-neutral-900"
        >
          Month view
          <Image
            src={`/images/icons/Chevron-Down-Icon.svg`}
            alt={"Chevron Down?"}
            className="ml-2 h-5 w-5 text-neutral-900"
            height={20}
            width={20}
            aria-hidden="true"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-neutral-50 shadow-lg focus:outline-none">
          <div className="py-1">
            <DropdownMenuItem>
              <a
                href="#"
                className={classNames(
                  // active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-base",
                )}
              >
                Day view
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="#"
                className={classNames(
                  // active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-base",
                )}
              >
                Week view
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="#"
                className={classNames(
                  // active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-base",
                )}
              >
                Month view
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="#"
                className={classNames(
                  // active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-base",
                )}
              >
                Year view
              </a>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
