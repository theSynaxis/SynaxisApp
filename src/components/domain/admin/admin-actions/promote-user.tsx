import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { USER_ROLES } from "~/lib/constants";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
  username: string;
  currentUserRole: USER_ROLES;
}

export function PromoteUser(props: PromoteUserProps) {
  const { userId, username, currentUserRole } = props;
  const { toast } = useToast();

  const { mutate: promoteToMod, isLoading: modPromoteIsLoading } =
    api.user.makeMod.useMutation({
      onSuccess: async (_data, _variables) => {
        toast({
          title: `Success`,
          description: `${username} is now a moderator!`,
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
  const { mutate: promoteToAdmin, isLoading: adminPromoteIsLoading } =
    api.user.makeAdmin.useMutation({
      onSuccess: async (_data, _variables) => {
        toast({
          title: `Success`,
          description: `${username} is now an administrator!`,
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
