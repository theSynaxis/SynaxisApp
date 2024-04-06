import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export default async function SayingsApp() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Lives</span> of the Saints
        </h1>

        <h2>Saint Silouan the Athonite</h2>

        <Image
          src={"/images/saints/St-Silouan-Athonite.jpg"}
          alt="St Silouan The Athonite"
          width={340}
          height={400}
        />

        <p className="text-base">life of saint Silouan goes here</p>

        <Link href="/apps/lives/app/submit-saint">
          <Button>Submit Saint</Button>
        </Link>
      </div>
    </main>
  );
}
