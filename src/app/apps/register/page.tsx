import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CreateUser from "~/components/domain/users/create-user";

export default async function UserRegisterPage() {
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
          <span className="text-secondary-red-600">Register</span> An Account
        </h1>

        <div className="w-96">
          <CreateUser />
        </div>
      </div>
    </main>
  );
}
