import {
  WordpressTemplate,
  generateStaticParams as nextWpStaticParams,
  type RouteParams,
  type SearchParams,
} from "@nextwp/core";

import templates from "~/templates";

export default async function PageRoute(props: {
  params: RouteParams;
  searchParams?: SearchParams;
}) {
  return (
    <main className="flex min-h-[620px] flex-col items-center text-neutral-900">
      <div className="container flex flex-col items-center">
        <WordpressTemplate
          params={props.params}
          searchParams={props.searchParams}
          templates={templates}
        />
      </div>
    </main>
  );
}

export { generateMetadata } from "@nextwp/core";

export async function generateStaticParams() {
  return nextWpStaticParams({
    postTypes: ["pages", "posts"],
  });
}
