import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Calendar from "~/components/domain/calendar/Calendar";

export default async function SingleEventPage() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
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

        <div>This is where the default calendar goes.</div>

        <Calendar />

        <p>
          Event Info: parish info, event title, address, date, time, google maps
          to click on.
        </p>

        <p>
          back button to go back to previous page, whether the calendar or
          otherwise
        </p>

        {/* if user is assigned only one parish. */}
        <Link href="/apps/calendar/app/parishes/parish">Your Parish Info</Link>

        {/* if user is assigned multiple parishes. */}
        <Link href="/apps/calendar/app/parishes">Your Parishes</Link>

        {/* so users can change their default location preferences */}
        <Link href="/apps/user-settings">User Settings</Link>
      </div>
    </main>
  );
}
