import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { formatDate } from "date-fns";

import { Button } from "~/components/ui/button";
import LivesCard from "~/components/domain/lives/lives-card";

export default async function LivesApp() {
  noStore();
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  const today = formatDate(new Date(), "EEEE, dd MMMM, y");

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Lives</span> of the Saints
        </h1>

        <h2>{today}</h2>

        <LivesCard />

        <h3>Saint Silouan the Athonite</h3>

        <Image
          src={"/images/saints/St-Silouan-Athonite.jpg"}
          alt="St Silouan The Athonite"
          width={340}
          height={400}
        />

        <p className="text-base">life of saint Silouan goes here</p>

        {userSession?.value ? (
          <Link href="/apps/lives/app/submit-saint">
            <Button>Submit Saint</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
