import { cookies } from "next/headers";
import NotFound from "~/app/not-found";

export default function DefaultPageTemplate() {
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  if (!userSession) return <NotFound />;

  return (
    <>
      <title>404 Not Found</title>
      <h1>ADMIN</h1>
    </>
  );
}

export { generateMetadata } from "@nextwp/core";
