"use client";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { Checkbox } from "~/components/ui/checkbox";

export default function SubmitSaint() {
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState("");

  const formSchema = z.object({
    name: z.string().min(3),
    isBc: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isBc: false,
    },
  });

  const {
    formState: { isDirty },
    // setError,
  } = form;

  const createSaint = api.saint.create.useMutation({
    onSuccess: (_data, variables) => {
      toast({
        title: `Success`,
        description: `St. ${variables.name} has been submitted!`,
      });
    },
    onError: (e) => {
      return setSubmitError(e.message);
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    createSaint.mutate({
      name: formData.name,
      isBc: formData.isBc,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="sr-only">Saint Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Saint Name"
                    className="text-black w-full rounded-full px-4 py-2"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="ml-4">
                  Please do not include &quot;Saint&quot; or &quot;St&quot;.
                </FormDescription>
                <FormMessage className="pl-4 font-bold text-secondary-red-500" />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={form.control}
          name="isBc"
          render={({ field }) => (
            <>
              <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                <FormLabel className="sr-only">
                  Did this saint live before the incarnation?
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  {/* // className="text-black w-full rounded-full px-4 py-2" */}
                </FormControl>
                <FormDescription>
                  Did this saint live before the incarnation?
                </FormDescription>
                <FormMessage className="pl-4 font-bold text-secondary-red-500" />
              </FormItem>
            </>
          )}
        />

        {submitError && (
          <p className="pl-4 font-bold text-secondary-red-500">{submitError}</p>
        )}

        <Button
          variant={createSaint.isLoading || isDirty ? "default" : "disabled"}
        >
          {createSaint.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
