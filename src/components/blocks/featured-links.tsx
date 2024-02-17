import Link from "next/link";
import Image from "next/image";
import Edges from "~/components/layout/edges";
import { parseHtml } from "~/lib/utils";

export interface FeaturedLinksProps {
  featured_links_title?: string;
  featured_links_text?: string;
  featured_links?: {
    text?: string;
    link?: {
      title: string;
      url: string;
      target: string;
    };
    icon?: {
      url: string;
      alt: string;
    };
  }[];
}

export function FeaturedLinks(props: FeaturedLinksProps) {
  const { featured_links_title, featured_links_text, featured_links } = props;

  return (
    <>
      <Edges className="relative min-h-[50vh]">
        <div className="relative z-10 min-h-[50vh] pb-4 pt-8">
          <div className="w-full">
            <div className="flex flex-col items-center gap-4">
              {featured_links_title && (
                <h2 className="font-synaxisHeader">
                  {parseHtml(featured_links_title)}
                </h2>
              )}

              <span className="w-3/5 text-center">
                {featured_links_text && <p>{featured_links_text}</p>}
              </span>
              <span className="flex flex-row items-center divide-x-2 divide-secondary-red-500">
                {featured_links?.map((featuredLink) => {
                  const { link, text, icon } = featuredLink;

                  return (
                    <div key={`${link?.title}-${link?.url}`}>
                      {link && (
                        <Link
                          href={`${link.url}`}
                          className="flex flex-col items-center justify-between gap-4 p-6"
                        >
                          {icon && (
                            <Image
                              src={`${icon.url}`}
                              alt={`${icon.alt}`}
                              width={48}
                              height={48}
                            />
                          )}

                          <h3>{link?.title}</h3>

                          <p>{text}</p>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </span>
            </div>
          </div>
        </div>
      </Edges>
    </>
  );
}
