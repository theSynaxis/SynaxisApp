import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { cookies } from "next/headers";

import { Button } from "~/components/ui/button";
import LivesToday from "~/components/domain/lives/lives-today";
import { today } from "~/lib/utils";

export default async function LivesApp() {
  noStore();
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  return (
    <main className="flex w-full flex-col items-center justify-start text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-6 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Lives</span> of the Saints
        </h1>

        <h2>{today}</h2>

        <LivesToday />

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
