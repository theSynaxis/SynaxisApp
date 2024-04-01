import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Calendar from "~/components/domain/calendar/Calendar";

export default async function CalendarPage() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          Divine Service{" "}
          <span className="text-secondary-red-600">Calendar</span>
        </h1>
        <Calendar />

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
