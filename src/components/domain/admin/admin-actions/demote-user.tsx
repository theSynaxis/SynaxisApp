import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { USER_ROLES } from "~/lib/constants";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
  username: string;
  currentUserRole: USER_ROLES;
}

export function DemoteUser(props: PromoteUserProps) {
  const { userId, username, currentUserRole } = props;
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate: demoteFromMod, isLoading: userDemoteIsLoading } =
    api.user.demoteUserFromMod.useMutation({
      onSuccess: async (_data, _variables) => {
        await utils.user.list.invalidate();
        toast({
          title: `Success`,
          description: `${username} has been demoted to a regular user.`,
        });
      },
      onError: (e) => {
        toast({
          title: `Error`,
          variant: "destructive",
          description: `${e.message}`,
        });
      },
    });
  const { mutate: demoteToMod, isLoading: modDemoteIsLoading } =
    api.user.makeMod.useMutation({
      onSuccess: async (_data, _variables) => {
        await utils.user.list.invalidate();
        toast({
          title: `Success`,
          description: `${username} has been demoted to a moderator.`,
        });
      },
      onError: (e) => {
        toast({
          title: `Error`,
          variant: "destructive",
          description: `${e.message}`,
        });
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
