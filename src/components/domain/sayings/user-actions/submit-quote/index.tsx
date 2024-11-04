"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "~/trpc/react";
import { formSchema } from "./formSchema";
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
import SaintCombobox from "~/components/domain/common/saint-combobox";

export default function SubmitQuote() {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

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
    setValue,
    // setError,
    reset,
  } = form;

  const createQuote = api.quote.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: `Success`,
        description: `Saying of St. ${data.saint} has been submitted!`,
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
      citation: {
        publicationCity: formData.publicationCity, // supplied by ISBN lookup
        publicationYear: formData.publicationYear, // supplied by ISBN lookup
        pageStart: formData.pageStart,
        pageEnd: formData.pageEnd,
      },
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
                    <SaintCombobox field={field} setValue={setValue} />
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
