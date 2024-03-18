import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { Separator } from "~/components/ui/separator";

export default function QuoteCard() {
  const header = "Quote of the Day";

  return (
    <>
      <Card className="border border-neutral-300 shadow-lg">
        <CardHeader className="text-xl">{header}</CardHeader>

        <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
          <Image
            src={"/images/saints/St-Silouan-Athonite.jpg"}
            alt="St Silouan The Athonite"
            width={140}
            height={200}
          />

          <p>
            &quot;In church I was listening to a reading from the Prophet
            Isaiah, and at the words, “Wash you make you clean,” I reflected,
            “Maybe the Mother of God sinned at one time or another, if only in
            thought.” And, marvelous to relate, in unison with my prayer a voice
            sounded in my heart, saying clearly, “The Mother of God never sinned
            even in thought.” Thus did the Holy Spirit bear witness in my heart
            to her purity. &quot;
            <br />
            --
            <Link href="/apps/sayings/app/saints/saint" className="font-bold">
              Saint Silouan the Athonite
            </Link>
            , as found in
            <Link href="/apps/sayings/app/works/work" className="italic">
              St. Silouan the Athonite
            </Link>
            , pp. 391-2.
          </p>
        </CardContent>

        <CardFooter className="flex flex-row items-center justify-between">
          <Button>Add Quote to Collection: opens popover</Button>
          {/* the modal can create new collection or add quote to existing collection, like youtube saves */}

          <Menubar className="border border-neutral-300">
            <MenubarMenu>
              <MenubarTrigger className="text-base">Subscribe</MenubarTrigger>
              <MenubarContent className="bg-neutral-50">
                <MenubarItem className="flex flex-row items-center justify-between text-base">
                  <Image
                    src={"/images/icons/Person-Icon.svg"}
                    alt="Subscribe to see more of this saint's quotes."
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                  To St Silouan the Athonite
                </MenubarItem>
                <MenubarItem className="flex flex-row items-center justify-between text-base">
                  <Image
                    src={"/images/icons/Book-Icon.svg"}
                    alt="Subscribe to see more of this book's quotes."
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                  To St. Silouan the Athonite
                </MenubarItem>
              </MenubarContent>
              <Separator
                orientation="vertical"
                className="border border-neutral-300"
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-base">Share</MenubarTrigger>
              <MenubarContent className="bg-neutral-50">
                <MenubarItem className="flex flex-row items-center justify-between text-base">
                  <Image
                    src={"/images/icons/Facebook-Icon.svg"}
                    alt="Share on Facebook!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                  Facebook
                  <Image
                    src={"/images/icons/External-Link-Icon.svg"}
                    alt="Share on Facebook!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                </MenubarItem>
                <Separator
                  orientation="horizontal"
                  className="border border-neutral-300"
                />
                <MenubarItem className="flex flex-row items-center justify-between text-base">
                  <Image
                    src={"/images/icons/Twitter-Icon.svg"}
                    alt="Share on Twitter!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                  Twitter
                  <Image
                    src={"/images/icons/External-Link-Icon.svg"}
                    alt="Share on Twitter!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                </MenubarItem>
                <Separator
                  orientation="horizontal"
                  className="border border-neutral-300"
                />
                <MenubarItem className="flex flex-row items-center justify-between text-base">
                  <Image
                    src={"/images/icons/Discord-Icon.svg"}
                    alt="Share on Discord!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                  Discord
                  <Image
                    src={"/images/icons/External-Link-Icon.svg"}
                    alt="Share on Discord!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                </MenubarItem>
                <Separator
                  orientation="horizontal"
                  className="border border-neutral-300"
                />
                <MenubarItem className="flex flex-row items-center justify-between text-base">
                  <Image
                    src={"/images/icons/Mail-Icon.svg"}
                    alt="Share through Email!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                  Email
                  <Image
                    src={"/images/icons/External-Link-Icon.svg"}
                    alt="Share through Email!"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <Separator
                orientation="vertical"
                className="border border-neutral-300"
              />
              <MenubarTrigger className="text-base font-bold text-secondary-red-400">
                Report
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </CardFooter>
      </Card>
    </>
  );
}
