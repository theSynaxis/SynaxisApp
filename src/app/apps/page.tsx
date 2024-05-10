import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function AppsPage() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-8 px-4 py-4">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          The <span className="text-secondary-red-600">Synaxis</span> App
        </h1>
        <h2>Apps for Eastern Orthodox Christians</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 shadow-md hover:bg-white/20 hover:shadow-lg"
            href="/apps/lives"
          >
            <h3 className="text-2xl font-bold">Lives →</h3>
            <div className="text-lg">
              Learn about the lives of holy men and women.
            </div>
          </Link>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 shadow-md">
            <h3 className="text-2xl font-bold">Sayings - Coming Soon</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 shadow-md">
            <h3 className="text-2xl font-bold">Calendar - Coming Soon</h3>
            <div className="text-lg">
              Find the divine services in parishes near you.
            </div>
          </div>
          <div className="flex max-w-xs cursor-default flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 text-neutral-50 shadow-md">
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
          <div className="flex max-w-xs cursor-default flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 text-neutral-50 shadow-md">
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
          <div className="flex max-w-xs cursor-default flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 text-neutral-50 shadow-md">
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
          <div className="flex max-w-xs cursor-default flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 text-neutral-50 shadow-md">
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
          <div className="flex max-w-xs cursor-default flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 text-neutral-50 shadow-md">
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
          <div className="flex max-w-xs cursor-default flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 text-neutral-50 shadow-md">
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
