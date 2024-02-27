import { generateSitemap } from '@nextwp/core'
import { env } from "~/env.js";

export default async function sitemap() {
  const allItems = await generateSitemap({
    postTypes: ['pages', 'posts'],
  })

  const filteredItems = allItems.filter(item => !item.url.includes(`${env.NEXT_PUBLIC_ADMIN_ROUTE}`));

  return filteredItems;
}
