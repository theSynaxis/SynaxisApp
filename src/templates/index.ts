import type { Templates } from "@nextwp/core";
import DefaultPageTemplate from './pages/default'
import DefaultPostTemplate from './posts/default'
import PostArchiveTemplate from './archives/default'

const templates: Templates = {
    page: {
      default: DefaultPageTemplate,
    },
    post: {
      default: DefaultPostTemplate,
    },
    archive: {
      posts: PostArchiveTemplate,
    },
}
  
export { templates as default }
