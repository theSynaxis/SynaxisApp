"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type WpMenuItem } from "@nextwp/core";
import { parseHtml } from "~/lib/utils";

export default function NavMenu(props: { items: WpMenuItem[] }) {
  const { items } = props;
  const pathname = usePathname();

  return (
    <ul className="flex flex-row items-center justify-around">
      {items?.map((item) => {
        return (
          <li key={`${item.label}`} className="m-4">
            <Link
              className={`${`${pathname}/` === `/${item.path}` ? "border-b-2 border-b-primary-gold-400" : ""} text-primary-gold-400`}
              href={`/${item.path}`}
            >
              {parseHtml(`${item.label}`)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
