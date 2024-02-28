import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function SayingsApp() {
  noStore();

  return (
    <main className="flex w-4/5 flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          <span className="text-secondary-red-600">Sayings</span> of the Fathers
        </h1>

        <p className="">All Quotes Go Here</p>
        <p>Search Form Goes Here</p>
        <p>Link to open advanced search modal</p>

        <Link href="/apps/sayings/app/saints/saint">
          Link to specific saints page for all quotes by one saint
        </Link>

        <Link href="/apps/sayings/app/works/work">
          Link to specific works page for all quotes in one work
        </Link>

        <Link href="/apps/sayings/app/categories/category">
          Link to specific categories page for all quotes in one category
        </Link>

        <Link href="/apps/sayings/app/submit-quote">
          <Button>Submit Quote</Button>
        </Link>

        <Button>Add Quote to Collection: opens modal</Button>
        {/* the modal can create new collection or add quote to existing collection, like youtube saves */}
      </div>
    </main>
  );
}
