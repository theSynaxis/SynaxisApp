"use client";

import { unstable_noStore as noStore } from "next/cache";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

import SubmitLife from "~/components/domain/lives/user-actions/submit-life";

export default function SubmitLifePage() {
  noStore();
  //   const cookieStore = cookies();
  //   const userSession = cookieStore.get("auth_session");

  //   if (!userSession) redirect("/apps");

  const searchParams = useSearchParams();
  const saintId = searchParams.get("saintId");
  const saintName = searchParams.get("saintName");

  return (
    <main className="flex w-full flex-col items-center justify-between text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Lives</span> of the Saints
        </h1>

        <div className="w-3/5">
          <SubmitLife id={Number(saintId)} name={String(saintName)} />
        </div>
      </div>
    </main>
  );
}
