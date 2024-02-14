import { getSiteSettings } from "@nextwp/core";
import Link from "next/link";

export default async function Footer() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <footer className="mx-auto border-2 border-t-secondary-red-500 bg-neutral-900 p-4">
        <p className="mx-auto text-center text-primary-gold-400">
          &copy; {new Date().getFullYear().toString()}
          <Link className="m-2 font-synaxisHeader" href="/">
            {siteSettings.title}
          </Link>
        </p>
      </footer>
    </>
  );
}
