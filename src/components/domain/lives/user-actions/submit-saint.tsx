"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
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

interface SubmitSaintProps {
  closeModal?: () => void;
}

export default function SubmitSaint(props: SubmitSaintProps) {
  const { closeModal } = props;
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const formSchema = z
    .object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isDirty },
    setError,
  } = form;

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      router.push("/apps/login");
      if (closeModal) return closeModal();
    },
    onError: (e) => {
      switch (e.message) {
        case "Username taken.":
          return setError("username", { type: "server", message: e.message });
        case "Email taken.":
          return setError("email", { type: "server", message: e.message });
        default:
          return setSubmitError(e.message);
      }
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    createUser.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  }

  // TODO: add logic for secure passwords:
  // example:
  // minLength: 8,
  // minLowercase: 1,
  // minUppercase: 1,
  // minNumbers: 1,
  // minSymbols: 1,

  // TODO: add email verification

  return (
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
                <FormLabel className="sr-only">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
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
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="sr-only">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="text-black w-full rounded-full px-4 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-4 font-bold text-secondary-red-500" />
              </FormItem>
            </>
          )}
        />
        {submitError && (
          <p className="pl-4 font-bold text-secondary-red-500">{submitError}</p>
        )}

        <Button
          variant={createUser.isLoading || isDirty ? "default" : "disabled"}
        >
          {createUser.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
