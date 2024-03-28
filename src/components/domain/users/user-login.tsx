"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import { loginAction } from "~/lib/actions/login";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface CreateUserProps {
  closeModal?: () => void;
}

export default function UserLogin(props: CreateUserProps) {
  const { closeModal } = props;
  const router = useRouter();

  const formSchema = z.object({
    usernameOrEmail: z.string().min(3),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const {
    formState: { isDirty },
    setError,
  } = form;

  const userLogin = api.user.login.useMutation({
    onSuccess: async (data) => {
      await loginAction(data); // sets cookie data

      if (closeModal) return closeModal();

      router.push("/apps");
    },
    onError: (e) => {
      setError("usernameOrEmail", { type: "server", message: e.message });
      return setError("password", { type: "server", message: e.message });
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    userLogin.mutate({
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    });
  }

  /* TODO: handle reset password"
   * Generate a unique token for the password reset request.
   * Associate this token with the user in your database, and set an expiry time for it.
   * Send an email to the user with a link containing this token.
   * When the user clicks the link, verify the token and its expiry time.
   * If the token is valid, allow the user to enter a new password.
   *
   * Logic is same for email verification, except toggle isVerified in db to true
   */

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="usernameOrEmail"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="sr-only">Username or Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username or Email"
                    className="text-black w-full rounded-full px-4 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-4 font-bold text-secondary-red-500" />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="text-black w-full rounded-full px-4 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-4 font-bold text-secondary-red-500" />
              </FormItem>
            </>
          )}
        />

        <Button
          variant={userLogin.isLoading || isDirty ? "default" : "disabled"}
        >
          {userLogin.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
