import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";

export default async function UserSettingsPage() {
  noStore();

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

        <div className="flex h-full flex-row items-start justify-normal gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex w-64 flex-col items-start justify-center">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  key={"component.title"}
                  title={"component.title"}
                  href={"/apps/user-settings/profile"}
                  className={
                    "text-md block select-none space-y-1 rounded-md p-3 font-medium leading-none no-underline outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100"
                  }
                >
                  Profile
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  key={"component.title"}
                  title={"component.title"}
                  href={"/apps/user-settings/profile"}
                  className={
                    "text-md block select-none space-y-1 rounded-md p-3 font-medium leading-none no-underline outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100"
                  }
                >
                  Profile
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  key={"component.title"}
                  title={"component.title"}
                  href={"/apps/user-settings/profile"}
                  className={
                    "text-md block select-none space-y-1 rounded-md p-3 font-medium leading-none no-underline outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100"
                  }
                >
                  Profile
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="">
            <h3>Use in the Browser</h3>
            <p>
              It&rsquo;s also a browser app! You can use it right here in your
              favorite browser.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
