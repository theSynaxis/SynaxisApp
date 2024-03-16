import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import UserLogin from "~/components/domain/users/user-login";

export default async function LoginPage() {
  noStore();
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  if (userSession) redirect("/apps");

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Login</span> To The Synaxis
          App
        </h1>

        <div className="w-96">
          <UserLogin />
        </div>
      </div>
    </main>
  );
}
