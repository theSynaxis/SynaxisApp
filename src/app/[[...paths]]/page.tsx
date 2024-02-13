import {
  WordpressTemplate,
  type RouteParams,
  type SearchParams,
} from "@nextwp/core";

import templates from "~/templates";

export default async function PageRoute(props: {
  params: RouteParams;
  searchParams?: SearchParams;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center pt-28 text-neutral-900">
      <div className="container flex flex-col items-center gap-12 px-4">
        <h1
          className={`font-synaxisHeader text-5xl font-extrabold tracking-tight text-primary-gold-600 sm:text-[5rem]`}
        >
          The <span className="text-secondary-red-600">Synaxis</span> App
        </h1>
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
