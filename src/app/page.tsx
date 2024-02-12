import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreateUser } from "~/app/_components/create-user";
import { api } from "~/trpc/server";
// import { inter } from "./fonts";

export default async function Home() {
  noStore();
  const hello = await api.user.hello.query({ text: "from tRPC" });

  return (
    <main className="text-white flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight sm:text-[5rem]`}
        >
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl p-4"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl p-4"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestUser = await api.user.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestUser ? (
        <p className="truncate">Your most recent user: {latestUser.username}</p>
      ) : (
        <p>You have no users yet.</p>
      )}

      <CreateUser />
    </div>
  );
}
