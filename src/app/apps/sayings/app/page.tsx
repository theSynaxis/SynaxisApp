import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";

export default async function SayingsApp() {
  noStore();

  return (
    <main className="flex w-4/5 flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Sayings</span> of the Fathers
        </h1>

        <Card>
          <CardHeader className="text-xl">Quote of the Day</CardHeader>

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
              thought.” And, marvelous to relate, in unison with my prayer a
              voice sounded in my heart, saying clearly, “The Mother of God
              never sinned even in thought.” Thus did the Holy Spirit bear
              witness in my heart to her purity. &quot;
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
        </Card>

        <p>Search Form Goes Here</p>
        <p>Link to open advanced search modal</p>

        <Link href="/apps/sayings/app/categories/category">
          Link to specific categories page for all quotes in one category
        </Link>

        <Link href="/apps/sayings/app/submit-quote">
          <Button>Submit Quote</Button>
        </Link>

        <Button>Add Quote to Collection: opens modal</Button>
        {/* the modal can create new collection or add quote to existing collection, like youtube saves */}
      </div>
    </main>
  );
}
