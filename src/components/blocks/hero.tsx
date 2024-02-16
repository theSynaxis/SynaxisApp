import { Button } from "../ui/button";
import Link from "next/link";
// import Image from "next/image";
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
    // hero_background_image,
  } = props;

  return (
    <>
      <Edges className="relative min-h-[50vh]">
        {/* <div className="z-[-10] overflow-hidden"> */}
        {/* {hero_background_image && (
            <Image
              src={hero_background_image.url}
              alt="Cover Image"
              className="object-cover"
              fill
              priority
              // placeholder="blur"
              quality={100}
            />
          )} */}
        {/* </div> */}

        <div className="relative z-10 min-h-[50vh] pt-8">
          <div className="w-1/2">
            <div className="flex flex-col gap-4">
              {hero_title && (
                <h1 className="font-synaxisHeader">{hero_title}</h1>
              )}

              {hero_text && <p>{hero_text}</p>}

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
                    {hero_secondary_button.title}
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
