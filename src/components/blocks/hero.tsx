import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import Edges from "~/components/layout/edges";

export interface HeroProps {
  hero_title?: string;
  hero_text?: string;
  hero_primary_button?: {
    title: string;
    url: string;
    target: string;
  };
  hero_secondary_button?: {
    title: string;
    url: string;
    target: string;
  };
  hero_background_image?: {
    url: string;
  };
}

export function Hero(props: HeroProps) {
  const {
    hero_title,
    hero_text,
    hero_primary_button,
    hero_secondary_button,
    hero_background_image,
  } = props;

  return (
    <>
      <Edges className="relative min-h-[50vh] border-b-2 border-secondary-red-500">
        <div className="z-[-10] overflow-hidden">
          {hero_background_image && (
            <Image
              src={hero_background_image.url}
              alt="Cover Image"
              className="hero-bg-image object-cover opacity-30 lg:opacity-100"
              fill
              priority
              quality={100}
            />
          )}
        </div>

        <div className="relative z-10 min-h-[50vh] pb-4 pt-8">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-4">
              {hero_title && (
                <h1 className="font-synaxisHeader">{hero_title}</h1>
              )}

              <span className="w-full lg:w-4/5">
                {hero_text && <p>{hero_text}</p>}
              </span>
              <span className="flex flex-row items-center gap-4">
                {hero_primary_button && (
                  <Link href={`${hero_primary_button.url}`}>
                    <Button className="text-bold text-md uppercase">
                      {hero_primary_button.title}
                    </Button>
                  </Link>
                )}

                {hero_secondary_button && (
                  <Link
                    href={`${hero_secondary_button.url}`}
                    className="hover:underline"
                  >
                    <Button className="text-bold text-md" variant={"link"}>
                      {hero_secondary_button.title}
                    </Button>
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
      </Edges>
    </>
  );
}
