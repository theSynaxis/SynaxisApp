import { getMenuItems, getSiteSettings, getSiteLogo } from "@nextwp/core";
import { sourceSansPro, synaxisHeader } from "../fonts";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import Sidebar from "~/components/layout/sidebar";
import "~/styles/globals.css";

export const metadata = {
  title: "Apps | The Synaxis",
  description: "Apps for Eastern Orthodox Christians.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuItems({ slug: "sidebar-menu" });
  const siteSettings = await getSiteSettings();
  const logo = await getSiteLogo();
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session")?.value;

  return (
    <html lang="en">
      <body
        className={`font-sans ${sourceSansPro.variable} ${synaxisHeader.variable} flex h-full flex-row justify-between bg-neutral-50`}
      >
        <TRPCReactProvider>
          <Sidebar
            menuItems={menuItems}
            siteSettings={siteSettings}
            logo={logo}
            userSession={userSession}
          />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
