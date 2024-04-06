import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SubmitSaint from "~/components/domain/lives/user-actions/submit-saint";

export default async function SayingsApp() {
  noStore();
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  if (!userSession) redirect("/apps");

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Sayings</span> of the Fathers
        </h1>

        <div className="w-3/5">
          <SubmitSaint />
        </div>
      </div>
    </main>
  );
}
