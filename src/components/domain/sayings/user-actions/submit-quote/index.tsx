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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { Textarea } from "~/components/ui/textarea";
import { Combobox } from "~/components/ui/combobox";

import { faker } from "@faker-js/faker";

export default function SubmitQuote() {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

  const saints = [
    { value: "St Silouan the Athonite", label: "St Silouan the Athonite" },
  ];

  const createFakeSaints = () => {
    const saint = faker.person.firstName();

    return {
      value: `St ${saint}`,
      label: `St ${saint}`,
    };
  };

  for (let index = 0; index < 1000; index++) {
    saints.push(createFakeSaints());
  }

  const formSchema = z.object({
    text: z.string().min(1),
    saint: z.object({
      id: z.number(),
      name: z.string().min(3),
      feastDate: z.object({
        month: z.coerce.number().min(1).max(12),
        day: z.coerce.number().min(1).max(31),
      }),
    }),
    publicationCity: z.string().min(1),
    publicationYear: z.string().min(1),
    pageStart: z.string().min(1),
    pageEnd: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      publicationCity: "",
      publicationYear: "",
      pageStart: "",
      pageEnd: "",
    },
  });

  const {
    formState: { isDirty },
    setError,
    reset,
  } = form;

  const createQuote = api.quote.create.useMutation({
    onSuccess: (_data, variables) => {
      toast({
        title: `Success`,
        description: `Saying of St. ${variables.saint} has been submitted!`,
      });
      return reset();
    },
    onError: (e) => {
      return setSubmitError(e.message);
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    createQuote.mutate({
      text: formData.text,
      publicationCity: formData.publicationCity, // supplied by ISBN lookup
      publicationYear: formData.publicationYear, // supplied by ISBN lookup
      pageStart: formData.pageStart,
      pageEnd: formData.pageEnd,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-12"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="text-lg">Saying</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the saint quote here."
                    className="text-black w-full rounded-lg px-4 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-4 font-bold text-secondary-red-500" />
              </FormItem>
            </>
          )}
        />

        <span className="flex flex-col items-start justify-between gap-4">
          <FormLabel className="text-lg">Citation Details</FormLabel>

          <span>
            <FormField
              control={form.control}
              name="saint"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">Saint</FormLabel>
                    <FormControl>
                      <Combobox items={saints} placeholder="Saint" {...field} />
                    </FormControl>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
          </span>

          <span className="flex flex-row items-center justify-normal gap-12">
            <FormField
              control={form.control}
              name="pageStart"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">From Page</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="From"
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
              name="pageEnd"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">To Page</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="To"
                        className="text-black w-full rounded-full px-4 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
          </span>
        </span>

        {submitError && (
          <p className="pl-4 font-bold text-secondary-red-500">{submitError}</p>
        )}

        <Button
          variant={createQuote.isLoading || isDirty ? "default" : "disabled"}
        >
          {createQuote.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
