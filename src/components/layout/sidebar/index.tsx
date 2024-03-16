"use client";

import { useState } from "react";
import OpenSidebar from "./openSidebar";
import ClosedSidebar from "./closedSidebar";

// import types
import type { WpMenuItem, WpSettings, WpMediaItem } from "@nextwp/core";

interface SidebarProps {
  menuItems: WpMenuItem[];
  siteSettings: WpSettings;
  logo: WpMediaItem;
  userSession: string | undefined;
}

export default function Sidebar(props: SidebarProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      {openSidebar ? (
        <>
          <OpenSidebar
            {...props}
            sidebarState={{ openSidebar, setOpenSidebar }}
          />
        </>
      ) : (
        <>
          <ClosedSidebar
            {...props}
            sidebarState={{ openSidebar, setOpenSidebar }}
          />
        </>
      )}
    </>
  );
}
