import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function LivesPage() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-between text-neutral-900">
      <div className="container flex flex-col items-center justify-between gap-24 px-4 py-4">
        <span className="flex flex-col items-center justify-between gap-8">
          <h1
            className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
          >
            <span className="text-secondary-red-600">Lives</span> of the Saints
          </h1>

          <h4 className="text-center">
            With the Lives app, you can become more familiar with the saints of
            the Orthodox Church.
          </h4>
        </span>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 shadow-md hover:bg-white/20 hover:shadow-lg"
            href="/apps/lives/app"
          >
            <h3 className="text-2xl font-bold">Use in Browser →</h3>
            <div className="text-lg">
              It&rsquo;s also a browser app! You can use it right here in your
              favorite browser.
            </div>
          </Link>
          <div className="flex max-w-md flex-col gap-4 rounded-xl border border-neutral-900 bg-white/10 p-4 shadow-md">
            <h3 className="text-2xl font-bold">
              Download the App - Coming Soon
            </h3>
            <div className="text-lg">
              Mobile app for your phone coming soon!
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
