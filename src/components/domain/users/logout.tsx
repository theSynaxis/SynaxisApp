"use client";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { logoutAction } from "~/lib/actions/logout";

export default function UserLogout() {
  const router = useRouter();

  const userLogout = api.user.logout.useMutation({
    onSuccess: async (data) => {
      await logoutAction(data); // sets blank cookie data
      router.push("/apps/login");
    },
    onError: (e) => console.log(e.message),
  });
  function handleClick() {
    userLogout.mutate();
  }

  return (
    <>
      <Button
        className="text-md m-2 bg-neutral-900 text-primary-gold-400"
        onClick={handleClick}
      >
        Logout
      </Button>
    </>
  );
}
