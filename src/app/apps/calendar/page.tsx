import { unstable_noStore as noStore } from "next/cache";

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
      </div>
    </main>
  );
}
