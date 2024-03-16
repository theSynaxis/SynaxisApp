import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function AppsPage() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          The <span className="text-secondary-red-600">Synaxis</span> App
        </h1>

        <p className="w-1/2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem saepe
          corporis, quaerat veritatis ipsam, iure sapiente quibusdam assumenda
          non, consequuntur quas accusamus? Suscipit inventore architecto illum
          maiores nostrum reprehenderit laboriosam!
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 p-4 shadow-md hover:shadow-lg"
            href="/apps/sayings"
          >
            <h3 className="text-2xl font-bold">Sayings →</h3>
            <div className="text-lg">
              Hear wisdom and truth from the friends of God.
            </div>
          </Link>
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 p-4 shadow-md hover:shadow-lg"
            href="/apps/calendar"
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
