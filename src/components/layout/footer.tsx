import { getSiteSettings } from "@nextwp/core";
import Link from "next/link";
import Image from "next/image";
import Edges from "./edges";

export default async function Footer() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <footer className="mx-auto border-2 border-t-secondary-red-500 bg-neutral-900 p-4">
        <Edges>
          <div className="flex flex-row items-center justify-between">
            <span className="flex flex-row items-center gap-2">
              <Image
                src={`/images/icons/apple-download.svg`}
                alt={"Download in the Apple Store"}
                height={43}
                width={128}
              />
              <Image
                src={`/images/icons/google-play-download.svg`}
                alt={"Download in the Google Play Store"}
                height={43}
                width={128}
              />
            </span>
            <p className="text-primary-gold-400">
              &copy; {new Date().getFullYear().toString()}
              <Link className="m-2 font-synaxisHeader" href="/">
                {siteSettings.title}
              </Link>
            </p>
          </div>
        </Edges>
      </footer>
    </>
  );
}
