"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function ReportQuote() {
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

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1 text-base font-bold text-secondary-red-400 outline-none">
            Report
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Quote</DialogTitle>
            <DialogDescription>
              Bring a quote to the attention of our moderation team.
            </DialogDescription>
          </DialogHeader>

          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div> */}

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
                      <FormLabel className="sr-only">
                        Username or Email
                      </FormLabel>
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

              <DialogFooter>
                <Button
                  variant={
                    userLogin.isLoading || isDirty ? "default" : "disabled"
                  }
                >
                  {userLogin.isLoading ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
