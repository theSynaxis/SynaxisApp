import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default function QuoteCard() {
  const header = "Quote of the Day";

  return (
    <>
      <Card>
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
        <CardFooter>
          <Button>Add Quote to Collection: opens popover</Button>
          {/* the modal can create new collection or add quote to existing collection, like youtube saves */}
        </CardFooter>
      </Card>
    </>
  );
}
