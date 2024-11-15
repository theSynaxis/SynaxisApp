import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface PromoteUserProps {
  userId: string;
}

export function PromoteUser(props: PromoteUserProps) {
  const { userId } = props;
  const { mutate, isLoading, isError } = api.user.promote.useMutation({
    onSuccess: async () => {
      // success toast trigger
    },
    onError: (e) => {
      //   return setError("user", { type: "server", message: e.message });
    },
  });

  function handleClick() {
    return mutate({ userId });
  }

  return (
    <>
      <Button
        size={"sm"}
        variant={isLoading ? "disabled" : "default"}
        onClick={handleClick}
      >
        {isLoading ? "Promoting..." : "Promote User to Moderator"}
      </Button>
    </>
  );
}
