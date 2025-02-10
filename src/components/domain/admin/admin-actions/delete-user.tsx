import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
  username: string;
}

export function DeleteUser(props: PromoteUserProps) {
  const { userId, username } = props;
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate, isLoading } = api.user.delete.useMutation({
    onSuccess: async (_data, _variables) => {
      await utils.user.list.invalidate();
      toast({
        title: `Success`,
        description: `${username} has been deleted.`,
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
    return mutate({ userId });
  }

  return (
    <>
      <Button
        size={"sm"}
        variant={isLoading ? "disabled" : "default"} // TODO: Change variant to RED-CAUTION
        onClick={handleClick}
      >
        {isLoading ? "Deleting..." : "DELETE USER"}
      </Button>
    </>
  );
}
