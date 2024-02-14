import Image from "next/image";
import Link from "next/link";
import { getMenuItems, getSiteSettings, getSiteLogo } from "@nextwp/core";
import NavMenu from "./nav-menu";

export default async function Sidebar() {
  const menuItems = await getMenuItems({ slug: "main-menu" });
  const siteSettings = await getSiteSettings();
  const logo = await getSiteLogo();

  return (
    <>
      <div className="flex min-h-dvh w-1/5 flex-col items-start justify-between border-2 border-r-secondary-red-500 bg-neutral-900 uppercase">
        <span>
          <span className="m-4 flex flex-row items-center justify-between">
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

          <NavMenu items={menuItems} direction={"left"} />
        </span>

        <p className="mx-auto py-4 text-center text-primary-gold-400">
          &copy; {new Date().getFullYear().toString()}
          <Link className="m-2 font-synaxisHeader" href="/">
            {siteSettings.title}
          </Link>
        </p>
      </div>
    </>
  );
}