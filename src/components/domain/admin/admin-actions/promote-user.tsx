import { Button } from "~/components/ui/button";
import { USER_ROLES } from "~/lib/constants";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
  currentUserRole: USER_ROLES;
}

export function PromoteUser(props: PromoteUserProps) {
  const { userId, currentUserRole } = props;

  const { mutate: promoteToMod, isLoading: modPromoteIsLoading } =
    api.user.promote.useMutation({
      onSuccess: async () => {
        // success toast trigger
      },
      onError: (e) => {
        //   return setError("user", { type: "server", message: e.message });
      },
    });
  const { mutate: promoteToAdmin, isLoading: adminPromoteIsLoading } =
    api.user.makeAdmin.useMutation({
      onSuccess: async () => {
        // success toast trigger
      },
      onError: (e) => {
        //   return setError("user", { type: "server", message: e.message });
      },
    });

  function handleClick() {
    switch (currentUserRole) {
      case USER_ROLES.USER:
        return promoteToMod({ userId });
      case USER_ROLES.MODERATOR:
        return promoteToAdmin({ userId });
      default:
        break;
    }
  }

  const buttonText =
    currentUserRole === USER_ROLES.USER
      ? "Promote User to Moderator"
      : "Make User an Administrator";

  return (
    <>
      <Button
        size={"sm"}
        variant={
          modPromoteIsLoading || adminPromoteIsLoading ? "disabled" : "default"
        }
        onClick={handleClick}
      >
        {modPromoteIsLoading || adminPromoteIsLoading
          ? "Promoting..."
          : buttonText}
      </Button>
    </>
  );
}
