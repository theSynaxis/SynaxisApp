import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
  username: string;
}

export function BanUser(props: PromoteUserProps) {
  const { userId, username } = props;
  const { toast } = useToast();

  const { mutate, isLoading } = api.user.ban.useMutation({
    onSuccess: async (_data, _variables) => {
      toast({
        title: `Success`,
        description: `${username} has been banned until ${username}.`,
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
        {isLoading ? "Banning..." : "BAN USER"}
      </Button>
    </>
  );
}
