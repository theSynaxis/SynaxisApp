import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import QuoteCard from "~/components/domain/sayings/quote-card";
import QuotesTable from "~/components/domain/sayings/quotes-table";

export default async function SayingsApp() {
  noStore();

  return (
    <main className="flex w-full flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Sayings</span> of the Fathers
        </h1>

        <QuoteCard />

        <p>Search Form Goes Here | Link to open advanced search modal</p>

        <QuotesTable />
        <Link href="/apps/sayings/app/categories/category">
          Link to specific categories page for all quotes in one category
        </Link>
        <Link href="/apps/sayings/app/submit-quote">
          <Button>Submit Quote</Button>
        </Link>
      </div>
    </main>
  );
}
