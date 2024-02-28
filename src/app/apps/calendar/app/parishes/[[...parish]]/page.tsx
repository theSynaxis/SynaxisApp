import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function CalendarPage() {
  noStore();

  return (
    <main className="flex w-4/5 flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          Divine Service{" "}
          <span className="text-secondary-red-600">Calendar</span>
        </h1>

        <p className="w-1/2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem saepe
          corporis, quaerat veritatis ipsam, iure sapiente quibusdam assumenda
          non, consequuntur quas accusamus? Suscipit inventore architecto illum
          maiores nostrum reprehenderit laboriosam!
        </p>

        <div>
          <h3>Download</h3>
          <p>From Apple App Store</p>
          <p>From Google Play Store</p>
        </div>

        <Link href="/apps/calendar/app">
          <div>
            <h3>Use in the Browser</h3>
            <p>
              It&rsquo;s also a browser app! You can use it right here in your
              favorite browser.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
