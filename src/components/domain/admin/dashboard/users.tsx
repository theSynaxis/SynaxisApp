import { api } from "~/trpc/react";
import { Separator } from "~/components/ui/separator";
import AllUsersTable from "./users-table";

export default function AllUsers() {
  return (
    <div className="w-full">
      <h3>All Users</h3>
      <p>This is how others will see you on the site.</p>

      <Separator className="mt-4 w-full border border-b-0 border-l-0 border-r-0 p-2" />
      <AllUsersTable />
    </div>
  );
}
