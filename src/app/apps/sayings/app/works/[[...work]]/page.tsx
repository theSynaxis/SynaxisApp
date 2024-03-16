import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default async function SayingsApp() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Sayings</span> of the Fathers
        </h1>

        <h2>Saint Silouan the Athonite by St Sophrony</h2>

        <Image
          src={"/images/books/new-edition-st-silouan.jpg"}
          alt="Saint Silouan The Athonite"
          width={340}
          height={400}
        />

        <p className="text-base">blurb of book goes here</p>

        <h3>Sayings from Saint Silouan the Athonite</h3>

        <Link href="/apps/sayings/app/submit-quote">
          <Button>Submit Quote</Button>
        </Link>

        <Card>
          <CardHeader></CardHeader>

          <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
            <Image
              src={"/images/saints/St-Silouan-Athonite.jpg"}
              alt="St Silouan The Athonite"
              width={140}
              height={200}
            />

            <p>
              In church I was listening to a reading from the Prophet Isaiah,
              and at the words, “Wash you make you clean,” I reflected, “Maybe
              the Mother of God sinned at one time or another, if only in
              thought.” And, marvelous to relate, in unison with my prayer a
              voice sounded in my heart, saying clearly, “The Mother of God
              never sinned even in thought.” Thus did the Holy Spirit bear
              witness in my heart to her purity.
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
            <Button>Add Quote to Collection: opens modal</Button>
            {/* TODO: the modal can create new collection or add quote to existing collection, like youtube saves */}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader></CardHeader>

          <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
            <Image
              src={"/images/saints/St-Silouan-Athonite.jpg"}
              alt="St Silouan The Athonite"
              width={140}
              height={200}
            />

            <p>
              In church I was listening to a reading from the Prophet Isaiah,
              and at the words, “Wash you make you clean,” I reflected, “Maybe
              the Mother of God sinned at one time or another, if only in
              thought.” And, marvelous to relate, in unison with my prayer a
              voice sounded in my heart, saying clearly, “The Mother of God
              never sinned even in thought.” Thus did the Holy Spirit bear
              witness in my heart to her purity.
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
            <Button>Add Quote to Collection: opens modal</Button>
            {/* TODO: the modal can create new collection or add quote to existing collection, like youtube saves */}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader></CardHeader>

          <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
            <Image
              src={"/images/saints/St-Silouan-Athonite.jpg"}
              alt="St Silouan The Athonite"
              width={140}
              height={200}
            />

            <p>
              In church I was listening to a reading from the Prophet Isaiah,
              and at the words, “Wash you make you clean,” I reflected, “Maybe
              the Mother of God sinned at one time or another, if only in
              thought.” And, marvelous to relate, in unison with my prayer a
              voice sounded in my heart, saying clearly, “The Mother of God
              never sinned even in thought.” Thus did the Holy Spirit bear
              witness in my heart to her purity.
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
            <Button>Add Quote to Collection: opens modal</Button>
            {/* TODO: the modal can create new collection or add quote to existing collection, like youtube saves */}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader></CardHeader>

          <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
            <Image
              src={"/images/saints/St-Silouan-Athonite.jpg"}
              alt="St Silouan The Athonite"
              width={140}
              height={200}
            />

            <p>
              In church I was listening to a reading from the Prophet Isaiah,
              and at the words, “Wash you make you clean,” I reflected, “Maybe
              the Mother of God sinned at one time or another, if only in
              thought.” And, marvelous to relate, in unison with my prayer a
              voice sounded in my heart, saying clearly, “The Mother of God
              never sinned even in thought.” Thus did the Holy Spirit bear
              witness in my heart to her purity.
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
            <Button>Add Quote to Collection: opens modal</Button>
            {/* TODO: the modal can create new collection or add quote to existing collection, like youtube saves */}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader></CardHeader>

          <CardContent className="flex flex-row items-center justify-around gap-8 text-2xl">
            <Image
              src={"/images/saints/St-Silouan-Athonite.jpg"}
              alt="St Silouan The Athonite"
              width={140}
              height={200}
            />

            <p>
              In church I was listening to a reading from the Prophet Isaiah,
              and at the words, “Wash you make you clean,” I reflected, “Maybe
              the Mother of God sinned at one time or another, if only in
              thought.” And, marvelous to relate, in unison with my prayer a
              voice sounded in my heart, saying clearly, “The Mother of God
              never sinned even in thought.” Thus did the Holy Spirit bear
              witness in my heart to her purity.
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
            <Button>Add Quote to Collection: opens modal</Button>
            {/* TODO: the modal can create new collection or add quote to existing collection, like youtube saves */}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
