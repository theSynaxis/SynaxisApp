import {
  WordpressTemplate,
  type RouteParams,
  type SearchParams,
} from "@nextwp/core";
import Link from "next/link";

import templates from "~/templates";

export default async function PageRoute(props: {
  params: RouteParams;
  searchParams?: SearchParams;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-neutral-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          The <span className="text-secondary-red-600">Synaxis</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 p-4 shadow-lg"
            href="/blog"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Blog Archive</h3>
            <div className="text-lg">Read some stuff.</div>
          </Link>
          <Link
            className="bg-white/10 hover:bg-white/20 flex max-w-xs flex-col gap-4 rounded-xl border border-neutral-900 p-4 shadow-lg"
            href="/apps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Apps</h3>
            <div className="text-lg">Check out our apps.</div>
          </Link>
        </div>
        <WordpressTemplate
          params={props.params}
          searchParams={props.searchParams}
          templates={templates}
        />
      </div>
    </main>
  );
}

export { generateMetadata, generateStaticParams } from "@nextwp/core";
