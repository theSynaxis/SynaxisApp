import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function Home() {
  noStore();

  return (
    <main className="flex flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          The <span className="text-secondary-red-600">Synaxis</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 p-4 shadow-md hover:shadow-lg"
            href="https://create.t3.gg/en/usage/first-steps"
          >
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </Link>
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 p-4 shadow-lg"
            href="https://create.t3.gg/en/introduction"
          >
            <h3 className="text-2xl font-bold">Calendar →</h3>
            <div className="text-lg">
              Find the divine services in parishes near you.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
