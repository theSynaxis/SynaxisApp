import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import UserSettings from "~/components/domain/users/settings";

export default function UserSettingsPage() {
  noStore();
  const cookieStore = cookies();
  const userSession = cookieStore.get("auth_session");

  if (!userSession) redirect("/apps");

  return <UserSettings />;
}
