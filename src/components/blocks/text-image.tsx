import React from "react";
import Link from "next/link";
import Image from "next/image";

import { parseHtml } from "~/lib/utils";
import Edges from "~/components/layout/edges";
import { Button } from "../ui/button";

export interface TextImageProps {
  text_image_title?: string;
  text_image_subtitle?: string;
  text_image_content?: string;
  text_image_position?: string;
  text_image_button?: {
    target?: string;
    title?: string;
    url?: string;
  };
  text_image?: {
    url: string;
    altText?: string;
  };
}

export function TextImage(props: TextImageProps) {
  const {
    text_image_title,
    text_image_subtitle,
    text_image_content,
    text_image_position,
    text_image_button,
    text_image,
  } = props;

  return (
    <>
      <Edges>
        <section className="py-8">
          <div className="flex flex-row items-center justify-between gap-8">
            {String(text_image_position).includes("Left") && (
              <div className="w-1/2" data-aos="slide-right">
                <div className="mb-4">
                  <div className={""}>
                    {text_image?.url && (
                      <Image
                        className={`img-fluid rounded-lg shadow-lg`}
                        src={`${text_image.url}`}
                        alt={`${text_image.altText}`}
                        width={600}
                        height={400}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="wysiwyg w-1/2">
              <div className="mb-4">
                {text_image_title && (
                  <h2>{parseHtml(String(text_image_title))}</h2>
                )}

                {text_image_subtitle && (
                  <p className="">{parseHtml(String(text_image_subtitle))}</p>
                )}
              </div>

              {text_image_content && (
                <div className="mb-4">
                  {parseHtml(String(text_image_content))}
                </div>
              )}

              {text_image_button?.url && (
                <Link href={`${text_image_button.url}`} className="mt-8">
                  <Button>{text_image_button.title}</Button>
                </Link>
              )}
            </div>

            {String(text_image_position).includes("Right") && (
              <div className="w-1/2" data-aos="slide-left">
                <div className="mb-4">
                  <div className={""}>
                    {text_image?.url && (
                      <Image
                        className={`img-fluid rounded-lg shadow-lg`}
                        src={`${text_image.url}`}
                        alt={`${text_image.altText}`}
                        width={600}
                        height={400}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr className="mx-auto w-full border border-x-0 border-t-0 border-secondary-red-500 py-5" />
        </section>
      </Edges>
    </>
  );
}
