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

export default function ClosedSidebar(props: SidebarProps) {
  const {
    menuItems,
    siteSettings,
    logo,
    userSession,
    sidebarState: { openSidebar, setOpenSidebar },
  } = props;

  return (
    <>
      <div className="flex min-h-dvh w-1/12 flex-col items-start justify-between border-2 border-r-secondary-red-500 bg-neutral-900 p-2 uppercase">
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

            <Link className="sr-only" href="/">
              {siteSettings.title}
            </Link>
          </span>

          {!userSession && (
            <span className="mx-4 my-8 flex flex-col items-start justify-around gap-4">
              <LoginModal />

              <RegistrationModal />
            </span>
          )}

          <NavMenu items={menuItems} direction={"left"} />
          {/* TODO: Add user links; add admin links */}
          {/* <Link className="text-md text-primary-gold-400" href="/apps/admin">
            Admin
          </Link> */}
        </span>

        <Link
          href={"/apps/user-settings"}
          className="m-4 text-primary-gold-400"
        >
          Settings
        </Link>
        {userSession && <UserLogout />}

        <Button
          variant={"link"}
          className="flex flex-row items-center justify-between gap-2 text-primary-gold-400"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          Open
          <Image
            src={`/images/icons/Arrow-Right-Circle-Gold-Icon.svg`}
            alt={"Collapse Sidebar"}
            height={24}
            width={24}
          />
        </Button>

        <p className="mx-auto py-4 text-center text-primary-gold-400">
          &copy; {new Date().getFullYear().toString()}
          <br />
          <Link className="m-2 font-synaxisHeader" href="/">
            {siteSettings.title}
          </Link>
        </p>
      </div>
    </>
  );
}
