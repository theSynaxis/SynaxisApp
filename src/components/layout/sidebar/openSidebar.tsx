import Image from "next/image";
import Link from "next/link";

// import components
import NavMenu from "../nav-menu";
import RegistrationModal from "../../domain/users/registration-modal";
import LoginModal from "../../domain/users/login-modal";
import UserLogout from "../../domain/users/logout";
import { Button } from "~/components/ui/button";

// import types
import type { WpMenuItem, WpSettings, WpMediaItem } from "@nextwp/core";
import type { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  menuItems: WpMenuItem[];
  siteSettings: WpSettings;
  logo: WpMediaItem;
  userSession: string | undefined;
  sidebarState: {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  };
}

export default function OpenSidebar(props: SidebarProps) {
  const {
    menuItems,
    siteSettings,
    logo,
    userSession,
    sidebarState: { openSidebar, setOpenSidebar },
  } = props;

  return (
    <>
      <div className="flex min-h-dvh w-1/5 min-w-40 flex-col items-start justify-between border-2 border-r-secondary-red-500 bg-neutral-900 p-8 uppercase">
        <span>
          <span className="m-4 flex flex-row items-center justify-between">
            <Link href="/">
              <Image
                src={`${logo.source_url}`}
                alt={`${siteSettings.title}`}
                width={48}
                height={48}
                className="h-12 w-full"
              />
            </Link>

            <Link
              className="m-2 hidden font-synaxisHeader text-2xl text-primary-gold-400 xl:inline-block"
              href="/"
            >
              {siteSettings.title}
            </Link>
          </span>

          {!userSession && (
            <span className="mx-4 my-8 flex flex-row items-center justify-around">
              <LoginModal />

              <RegistrationModal />
            </span>
          )}

          {/* TODO: replace text nav links with icons */}

          <NavMenu items={menuItems} direction={"left"} />
          {/* TODO: Add user links; add admin links */}
          {/* <Link className="text-md text-primary-gold-400" href="/apps/admin">
            Admin
          </Link> */}
        </span>

        {userSession && (
          <span className="flex flex-col items-start">
            <Link
              href={"/apps/user-settings"}
              className="mx-4 text-primary-gold-400"
            >
              Settings
            </Link>
            <UserLogout />
          </span>
        )}

        <Button
          variant={"link"}
          className="flex-row items-center justify-between gap-2 text-primary-gold-400 lg:flex"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <p className="hidden md:inline-block">Close Sidebar</p>
          <Image
            src={`/images/icons/Arrow-Left-Circle-Gold-Icon.svg`}
            alt={"Collapse Sidebar"}
            height={24}
            width={24}
          />
        </Button>

        <p className="mx-auto py-4 text-center text-primary-gold-400">
          &copy; {new Date().getFullYear().toString()}
          <br className="" />
          <Link className="m-2 font-synaxisHeader" href="/">
            {siteSettings.title}
          </Link>
        </p>
      </div>
    </>
  );
}
