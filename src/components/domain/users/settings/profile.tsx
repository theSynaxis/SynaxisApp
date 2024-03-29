import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import { loginAction } from "~/lib/actions/login";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

export default function ProfileSettings() {
  const formSchema = z.object({
    username: z.string().min(3),
    email: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const {
    formState: { isDirty },
    setError,
  } = form;

  const userLogin = api.user.login.useMutation({
    onSuccess: async (data) => {
      await loginAction(data); // sets cookie data
    },
    onError: (e) => {
      setError("username", { type: "server", message: e.message });
      return setError("email", { type: "server", message: e.message });
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    userLogin.mutate({
      username: formData.username,
      email: formData.email,
    });
  }

  return (
    <div className="w-full">
      <h3>Profile</h3>
      <p>This is how others will see you on the site.</p>

      <Separator className="mt-4 w-2/3 border border-b-0 border-l-0 border-r-0 p-2" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username"
                      className="text-black w-2/3 rounded-lg px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </FormDescription>
                  <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email"
                      className="text-black w-2/3 rounded-lg px-4 py-2"
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
            name="bio"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="bio"
                      className="text-black w-2/3 rounded-lg px-4 py-2"
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
            name="denomination"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">Denomination</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="denomination"
                      className="text-black w-2/3 rounded-lg px-4 py-2"
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
            name="jurisdiction"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">Jurisdiction</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="jurisdiction"
                      className="text-black w-2/3 rounded-lg px-4 py-2"
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
            name="website"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">Website</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="website"
                      className="text-black w-2/3 rounded-lg px-4 py-2"
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
            className="mt-4 w-fit"
          >
            {userLogin.isLoading ? "Submitting..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
