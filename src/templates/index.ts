import type { Templates } from "@nextwp/core";
import DefaultPageTemplate from './pages/default'
import AdminPageTemplate from './pages/admin'
import DefaultPostTemplate from './posts/default'
import PostArchiveTemplate from './archives/default'

const templates: Templates = {
    page: {
      default: DefaultPageTemplate,
      appAdminTemplate: AdminPageTemplate,
    },
    post: {
      default: DefaultPostTemplate,
    },
    archive: {
      posts: PostArchiveTemplate,
    },
}
  
export { templates as default }
