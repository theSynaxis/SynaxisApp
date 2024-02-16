import Image from "next/image";
import Link from "next/link";
import { getMenuItems, getSiteSettings, getSiteLogo } from "@nextwp/core";
import NavMenu from "./nav-menu";

export default async function HeaderMenu() {
  const menuItems = await getMenuItems({ slug: "main-menu" });
  const siteSettings = await getSiteSettings();
  const logo = await getSiteLogo();

  return (
    <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-between border-2 border-b-secondary-red-500 bg-neutral-900 uppercase">
      <span className="flex flex-row items-center justify-between px-2 py-2 sm:px-4 lg:px-8">
        <Link href="/">
          <Image
            src={`${logo.source_url}`}
            alt={`${siteSettings.title}`}
            width={48}
            height={48}
          />
        </Link>

        <Link
          className="m-2 font-synaxisHeader text-2xl text-primary-gold-400"
          href="/"
        >
          {siteSettings.title}
        </Link>
      </span>

      <NavMenu items={menuItems} direction={"top"} />
    </header>
  );
}
