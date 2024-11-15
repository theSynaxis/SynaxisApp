import { Button } from "~/components/ui/button";
import { USER_ROLES } from "~/lib/constants";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
  currentUserRole: USER_ROLES;
}

export function DemoteUser(props: PromoteUserProps) {
  const { userId, currentUserRole } = props;

  const { mutate: demoteFromMod, isLoading: userDemoteIsLoading } =
    api.user.demoteUserFromMod.useMutation({
      onSuccess: async () => {
        // success toast trigger
      },
      onError: (e) => {
        //   return setError("user", { type: "server", message: e.message });
      },
    });
  const { mutate: demoteToMod, isLoading: modDemoteIsLoading } =
    api.user.makeMod.useMutation({
      onSuccess: async () => {
        // success toast trigger
      },
      onError: (e) => {
        //   return setError("user", { type: "server", message: e.message });
      },
    });

  function handleClick() {
    switch (currentUserRole) {
      case USER_ROLES.MODERATOR:
        return demoteFromMod({ userId });
      case USER_ROLES.ADMINISTRATOR:
        return demoteToMod({ userId });
      default:
        break;
    }
  }

  const buttonText =
    currentUserRole === USER_ROLES.ADMINISTRATOR
      ? "Demote User to Moderator"
      : "Demote User from Moderator";

  return (
    <>
      <Button
        size={"sm"}
        variant={
          userDemoteIsLoading || modDemoteIsLoading ? "disabled" : "default"
        }
        onClick={handleClick}
      >
        {userDemoteIsLoading || modDemoteIsLoading
          ? "Promoting..."
          : buttonText}
      </Button>
    </>
  );
}
