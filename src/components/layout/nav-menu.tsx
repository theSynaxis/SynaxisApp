"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type WpMenuItem } from "@nextwp/core";
import { parseHtml } from "~/lib/utils";
import Image from "next/image";

export default function NavMenu(props: {
  items: WpMenuItem[];
  direction: "top" | "left";
  isOpen?: boolean;
}) {
  const { items, direction, isOpen = true } = props;
  const pathname = usePathname();
  const flexDir: string = direction === "top" ? "row" : "col";
  const alignItems: string = direction === "top" ? "center" : "start";
  const activeLink = (path: string) => {
    if (`${pathname}/` !== `${path}`) return "";
    return "border-b-2 border-b-primary-gold-400";
  };

  const home = (
    <Image
      src={"/images/icons/Home-Gold-Icon.svg"}
      alt="Home"
      width={32}
      height={32}
      className="ml-auto h-8 w-8"
    />
  );

  const calendar = (
    <Image
      src={"/images/icons/Calendar-Gold-Icon.svg"}
      alt="Calendar"
      width={32}
      height={32}
      className="ml-auto h-8 w-8"
    />
  );

  const sayings = (
    <Image
      src={"/images/icons/Calendar-Gold-Icon.svg"}
      alt="Calendar"
      width={32}
      height={32}
      className="ml-auto h-8 w-8"
    />
  );

  function sidebarNavIcon(label: string) {
    return label.toLowerCase().includes("calendar")
      ? calendar
      : label.toLowerCase().includes("sayings")
        ? sayings
        : home;
  }

  return (
    <ul
      className={`flex flex-${flexDir} items-${alignItems} justify-around gap-4`}
    >
      {items?.map((item) => {
        return (
          <li key={`${item.label}`} className="mx-4">
            <Link
              className={`${direction === "left" ? "text-xl" : activeLink(`${item.path}`)} flex flex-row items-center gap-4 text-primary-gold-400`}
              href={`${item.path}`}
            >
              {direction === "left" ? (
                <>
                  <div className="border-4 border-primary-gold-400 p-1">
                    {sidebarNavIcon(`${item.label}`)}
                  </div>
                </>
              ) : (
                <></>
              )}
              {isOpen ? parseHtml(`${item.label}`) : ""}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
