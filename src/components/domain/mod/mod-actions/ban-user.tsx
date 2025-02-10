import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { format } from "date-fns";

interface PromoteUserProps {
  userId: string;
  username: string;
  date?: Date;
}

export function BanUser(props: PromoteUserProps) {
  const { userId, username, date } = props;
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate, isLoading } = api.user.ban.useMutation({
    onSuccess: async (_data, _variables) => {
      utils.user.list.invalidate();
      toast({
        title: `Success`,
        description: `${username} has been banned until ${date ? format(date, "MMM d, yyyy") : "Forever"}.`,
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
    return mutate({ userId, date });
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
