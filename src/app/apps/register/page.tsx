import { unstable_noStore as noStore } from "next/cache";
import CreateUser from "~/components/domain/users/create-user";

export default async function UserRegisterPage() {
  noStore();

  return (
    <main className="flex w-4/5 flex-col items-center justify-center text-neutral-900">
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
