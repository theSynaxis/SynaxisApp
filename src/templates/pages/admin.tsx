import { cookies } from "next/headers";
import NotFound from "~/app/[[...paths]]/not-found";
import AdminDashboard from "~/components/domain/admin/dashboard";

export default function DefaultPageTemplate() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  if (!userSession) return <NotFound />;

  return (
    <>
      <title>404 Not Found</title>
      <AdminDashboard />
    </>
  );
}

export { generateMetadata } from "@nextwp/core";
