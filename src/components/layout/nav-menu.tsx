"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type WpMenuItem } from "@nextwp/core";
import { parseHtml } from "~/lib/utils";

export default function NavMenu(props: {
  items: WpMenuItem[];
  direction: "top" | "left";
}) {
  const { items, direction } = props;
  const pathname = usePathname();
  const flexDir: string = direction === "top" ? "row" : "col";
  const alignItems: string = direction === "top" ? "center" : "start";
  const activeLink = (path: string) => {
    if (`${pathname}/` !== `/${path}`) return "";
    return "border-b-2 border-b-primary-gold-400";
  };

  return (
    <ul className={`flex flex-${flexDir} items-${alignItems} justify-around`}>
      {items?.map((item) => {
        return (
          <li key={`${item.label}`} className="m-4">
            <Link
              className={`${direction === "left" ? "" : activeLink(`${item.path}`)} text-md text-primary-gold-400`}
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
