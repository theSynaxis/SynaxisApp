"use client";

import React, { useState } from "react";
import { Separator } from "~/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import ProfileSettings from "./profile";
import AccountSettings from "./account";

type View = "profile" | "account";

export default function UserSettings() {
  const [view, setView] = useState<View>("profile");

  const views: { title: string; view: View }[] = [
    {
      title: "Profile",
      view: "profile",
    },
    {
      title: "Account",
      view: "account",
    },
  ];

  return (
    <main className="h-full min-h-screen w-full text-neutral-900">
      <div className="container flex h-full flex-col items-start justify-center gap-4 px-4 py-4 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">User</span> Settings
        </h1>

        <p className="w-1/2">
          Manage your account settings and set e-mail preferences.
        </p>

        <Separator className="w-full border border-neutral-400" />

        <div className="flex h-full w-full flex-row items-start justify-normal gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex w-64 flex-col items-start justify-center">
              {views.map((item) => {
                return (
                  <React.Fragment key={item.view}>
                    <NavigationMenuItem className="w-full" key={item.view}>
                      <span
                        className={`${item.view === view ? "bg-neutral-200" : ""} text-md block cursor-pointer select-none space-y-1 rounded-md p-3 font-medium leading-none no-underline outline-none transition-colors focus:bg-neutral-100`}
                        onClick={() => setView(item.view)}
                      >
                        {item.title}
                      </span>
                    </NavigationMenuItem>
                  </React.Fragment>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {view === "profile" ? <ProfileSettings /> : <AccountSettings />}
        </div>
      </div>
    </main>
  );
}
