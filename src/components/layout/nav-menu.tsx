"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type WpMenuItem } from "@nextwp/core";
import { parseHtml } from "~/lib/utils";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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

  const lives = (
    <Image
      src={"/images/icons/Calendar-Gold-Icon.svg"}
      alt="Calendar"
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
      src={"/images/icons/Chat-Gold-Icon.svg"}
      alt="Sayings"
      width={32}
      height={32}
      className="ml-auto h-8 w-8"
    />
  );

  function sidebarNavIcon(label: string) {
    const lowerCaseLabel = label.toLowerCase();
    switch (lowerCaseLabel) {
      case "calendar":
        return calendar;
      case "sayings":
        return sayings;
      case "lives":
        return lives;
      default:
        return home;
    }
  }

  return (
    <>
      <div className={`md:hidden ${direction === "left" ? "hidden" : ""}`}>
        <Popover>
          <PopoverTrigger>
            <Image
              src={"/images/icons/Menu-Gold-Icon.svg"}
              alt="Menu"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </PopoverTrigger>
          <PopoverContent className="w-fit bg-neutral-900" align="end">
            <ul
              className={`flex flex-col items-${alignItems} justify-around gap-4`}
            >
              {items?.map((item) => {
                return (
                  <li key={`${item.label}`} className="mx-4">
                    <Link
                      className={`${direction === "left" ? "text-xl" : activeLink(`${item.path}`)} flex flex-col items-center gap-4 text-primary-gold-400`}
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
                      {isOpen ? (
                        <>
                          <div className="">{parseHtml(`${item.label}`)}</div>
                        </>
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <ul
        className={`${direction === "top" ? "hidden md:flex" : "flex"}  flex-${flexDir} items-${alignItems} justify-around gap-4`}
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
                {isOpen ? (
                  <>
                    <div
                      className={`${direction === "left" ? "hidden lg:inline-block" : "hidden md:inline-block"}`}
                    >
                      {parseHtml(`${item.label}`)}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
