"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardContent } from "~/components/ui/card";
import {
  GREAT_SAINTS_DAY,
  OF_CHRIST_AND_THEOTOKOS,
  SAINT_WITH_GREAT_DOXOLOGY,
  SAINT_WITH_SERVICE,
  SIMPLE_COMMEMORATION,
} from "~/lib/constants";

type FeastType =
  | typeof OF_CHRIST_AND_THEOTOKOS
  | typeof GREAT_SAINTS_DAY
  | typeof SAINT_WITH_GREAT_DOXOLOGY
  | typeof SAINT_WITH_SERVICE
  | typeof SIMPLE_COMMEMORATION;

interface LivesCardProps {
  id: number;
  header: string;
  life: string;
  icon: string;
  feastType: FeastType;
  openState?: boolean;
}

export default function LivesCard(props: LivesCardProps) {
  const { header, icon, life, feastType, openState } = props;
  const [openLivesCard, setOpenLivesCard] = useState(openState);

  function iconType(feastType: FeastType) {
    switch (feastType) {
      case OF_CHRIST_AND_THEOTOKOS:
        return "/images/icons/Book-Gold-Icon.svg"; // TODO: ChiRo icon
      case GREAT_SAINTS_DAY:
        return "/images/icons/Calendar-Gold-Icon.svg"; // TODO: Elaborate cross icon
      case SAINT_WITH_GREAT_DOXOLOGY:
        return "/images/icons/Chat-Gold-Icon.svg"; // TODO: Big cross icon
      case SAINT_WITH_SERVICE:
        return "/images/icons/Home-Gold-Icon.svg"; // TODO: Simple cross icon
      case SIMPLE_COMMEMORATION:
        return "/images/icons/Dot-Filled-Icon.svg"; // TODO: change color to synaxis red
      default:
        return "/images/icons/Dot-Filled-Icon.svg";
    }
  }

  return (
    <>
      <Card className="w-full border border-neutral-300 shadow-lg">
        <CardHeader
          className="flex flex-row items-center justify-between text-xl"
          onClick={() => setOpenLivesCard(!openLivesCard)}
        >
          <Link
            href="/apps/lives/app/saints/saint"
            className="flex flex-row items-center justify-between gap-2"
          >
            <Image
              src={iconType(feastType)}
              alt="Minor Saint"
              className={`h-4 w-4 cursor-pointer`}
              width={16}
              height={16}
            />
            {header}
          </Link>

          <span>
            <Image
              src={"/images/icons/Chevron-Down-Icon.svg"}
              alt="Close"
              className={`${openLivesCard ? "hidden" : ""} h-4 w-4 cursor-pointer`}
              width={16}
              height={16}
              onClick={() => setOpenLivesCard(!openLivesCard)}
            />
            <Image
              src={"/images/icons/Chevron-Up-Icon.svg"}
              alt="Close"
              className={`${openLivesCard ? "" : "hidden"} h-4 w-4 cursor-pointer`}
              width={16}
              height={16}
              onClick={() => setOpenLivesCard(!openLivesCard)}
            />
          </span>
        </CardHeader>
        {openLivesCard ? (
          <>
            <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
              <Image
                src={icon}
                alt="St Silouan The Athonite"
                width={140}
                height={200}
              />

              <p className="w-4/5">
                {life ?? "There is no record for this saint."}
                <br />
                <Link href="/apps/lives/app/saints/saint" className="font-bold">
                  Read More →
                </Link>
              </p>
            </CardContent>
          </>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
