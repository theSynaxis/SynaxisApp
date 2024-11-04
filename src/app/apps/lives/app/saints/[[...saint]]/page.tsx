"use client";

import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "~/components/ui/button";
import { parseHtml } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function UniqueSaintPage() {
  noStore();
  const searchParams = useSearchParams();
  const saintId = searchParams.get("saintId");

  const { data, isLoading, isError } = api.saint.findSaintById.useQuery({
    id: Number(saintId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>ERROR</p>;

  return (
    <main className="flex w-full flex-col items-start justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Lives</span> of the Saints
        </h1>

        <h2>{data.name}</h2>

        <Image
          src={
            "https://images.oca.org/icons/sm/november/1104.seraphim.samoilovich.jpg"
          }
          alt="St Silouan The Athonite"
          width={340}
          height={400}
        />

        <span className="w-4/5 text-lg">{parseHtml(`${data.life}`)}</span>

        {/* <h3>Related Books</h3> */}

        {/* gallery of all related books goes here */}

        {/* <div className="flex flex-row flex-wrap items-center justify-between gap-8"> */}
        {/* <Link href="/apps/sayings/app/works/work">
            <Image
              src={"/images/books/st-silouan-the-athonite.webp"}
              alt="Saint Silouan The Athonite"
              width={340}
              height={400}
            /> */}
        {/* isbn: 9780881411959 */}
        {/* </Link> */}

        {/* <Link href="/apps/sayings/app/works/work">
            <Image
              src={"/images/books/new-edition-st-silouan.jpg"}
              alt="Saint Silouan The Athonite"
              width={340}
              height={400}
            /> */}
        {/* isbn: 9780881416817 */}
        {/* </Link> */}
        {/* </div> */}

        {/* <h3>Sayings</h3> */}

        <Link href="/apps/sayings/app/submit-quote">
          <Button>Submit Quote</Button>
        </Link>
      </div>
    </main>
  );
}
