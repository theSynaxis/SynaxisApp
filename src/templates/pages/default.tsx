import { FlexibleContent, type WpPage, type TemplateProps } from "@nextwp/core";
import * as blocks from "~/components/blocks";

import { type FeaturedLinksProps } from "~/components/blocks/featured-links";
import { type HeroProps } from "~/components/blocks/hero";
import { type TextImageProps } from "~/components/blocks/text-image";

type Block = FeaturedLinksProps | HeroProps | TextImageProps;

interface PageData extends WpPage {
  acf?: {
    flexible_content_modules?: Block[];
  };
}

interface DefaultTemplateProps extends TemplateProps {
  data: PageData;
}

export default function DefaultPageTemplate({ data }: DefaultTemplateProps) {
  return (
    <>
      <FlexibleContent
        rows={data?.acf?.flexible_content_modules}
        blocks={blocks}
      />
    </>
  );
}
