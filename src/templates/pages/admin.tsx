import { cookies } from "next/headers";
import NotFound from "~/app/[[...paths]]/not-found";
import AdminDashboard from "~/components/domain/admin/dashboard";
import { USER_ROLES } from "~/lib/constants";
import { api } from "~/trpc/server";

export default function AdminPageTemplate() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  if (!userSession) return <NotFound />;

  return (
    <>
      <AdminOr404 />
    </>
  );
}

// separating this logic into its own component is needed:
// when the currentSession.query() was called before `if (!userSession) return <NotFound />`
// it would throw an unauthorized error, since currentSession is a protectedProcedure.
// Doing it this way returns the 404 first if there is no session,
// then if there is a session it will find the user and render based on user role.
async function AdminOr404() {
  const user = await api.user.currentSession.query();
  if (!user) return <NotFound />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  if (user.role !== USER_ROLES.ADMINISTRATOR) return <NotFound />;

  return (
    <>
      <title>404 Not Found</title>
      <AdminDashboard />
    </>
  );
}

export { generateMetadata } from "@nextwp/core";
