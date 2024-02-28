import Image from "next/image";
import Link from "next/link";
import { getMenuItems, getSiteSettings, getSiteLogo } from "@nextwp/core";
import { cookies } from "next/headers";

// import components
import NavMenu from "./nav-menu";
import { Button } from "~/components/ui/button";
import RegistrationModal from "../domain/users/registration-modal";
import UserLogout from "../domain/users/logout";

export default async function Sidebar() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  const menuItems = await getMenuItems({ slug: "sidebar-menu" });
  const siteSettings = await getSiteSettings();
  const logo = await getSiteLogo();

  return (
    <>
      <div className="flex min-h-dvh w-1/5 flex-col items-center justify-between border-2 border-r-secondary-red-500 bg-neutral-900 uppercase">
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

          {!userSession && (
            <span className="mx-4 my-8 flex flex-row items-center justify-around">
              <Button>Login</Button>

              <RegistrationModal />
            </span>
          )}

          <NavMenu items={menuItems} direction={"left"} />
          {/* TODO: Add user links; add admin links */}
          {/* <Link className="text-md text-primary-gold-400" href="/apps/admin">
            Admin
          </Link> */}
        </span>

        {userSession && <UserLogout />}

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
