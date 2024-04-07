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
import {
  EQUAL_TO_THE_APOSTLES,
  SEVENTY_APOSTLES,
  TWELVE_APOSTLES,
} from "~/lib/constants";

export default function SubmitSaint() {
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState("");

  const formSchema = z.object({
    name: z.string().min(3),
    isBc: z.boolean(),
    feastDate: z.object({
      month: z.coerce.number().min(1).max(12),
      day: z.coerce.number().min(1).max(31),
    }),
    isApostle: z.boolean(),
    isLxx: z.boolean(),
    isEqualToApostle: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isBc: false,
      feastDate: {
        month: 0,
        day: 0,
      },
      isApostle: false,
      isLxx: false,
      isEqualToApostle: false,
    },
  });

  const {
    formState: { isDirty },
    setValue,
    reset,
    // setError,
  } = form;

  function beforeChrist() {
    // if the saint lived before the incarnation, then he isn't the following things too
    setValue("isApostle", false);
    setValue("isLxx", false);
    return setValue("isEqualToApostle", false);
  }

  function ofTheTwelveApostles() {
    // if the saint is an Apostle, then he isn't the following things too
    setValue("isBc", false);
    setValue("isLxx", false);
    return setValue("isEqualToApostle", false);
  }

  function ofTheSeventyApostles() {
    // if the saint is one of the 70, then he isn't the following things too
    setValue("isBc", false);
    setValue("isApostle", false);
    return setValue("isEqualToApostle", false);
  }

  function equalToTheApostles() {
    // if the saint is Equal to the Apostles, then he isn't the following things too
    setValue("isBc", false);
    setValue("isApostle", false);
    return setValue("isLxx", false);
  }

  const createSaint = api.saint.create.useMutation({
    onSuccess: (_data, variables) => {
      toast({
        title: `Success`,
        description: `St. ${variables.name} has been submitted!`,
      });
      return reset();
    },
    onError: (e) => {
      return setSubmitError(e.message);
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    const apostle = () => {
      if (formData.isApostle) return TWELVE_APOSTLES;
      if (formData.isLxx) return SEVENTY_APOSTLES;
      if (formData.isEqualToApostle) return EQUAL_TO_THE_APOSTLES;
      return null;
    };
    createSaint.mutate({
      name: formData.name,
      isBc: formData.isBc,
      feastDate: {
        month: Number(formData.feastDate.month),
        day: Number(formData.feastDate.day),
      },
      apostle: apostle(),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-12"
      >
        <span className="flex flex-row items-center justify-normal gap-12">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-lg">Saint Name</FormLabel>
                  <FormDescription className="italic">
                    Please do not include &quot;Saint&quot;.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Saint Name"
                      className="text-black w-full rounded-full px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                </FormItem>
              </>
            )}
          />

          <span>
            <FormLabel className="text-lg">Feast Day</FormLabel>

            <span className="flex flex-row items-center justify-normal gap-4">
              <FormField
                control={form.control}
                name="feastDate.month"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="text-sm">Month</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Month"
                          className="text-black w-20 rounded-full px-4"
                          min="1"
                          max="12"
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
                name="feastDate.day"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="text-sm">Day</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Day"
                          className="text-black w-20 rounded-full px-4"
                          min="1"
                          max="31"
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
        </span>

        <span className="flex flex-col gap-6">
          <FormLabel className="text-lg">Extra Information</FormLabel>

          <FormField
            control={form.control}
            name="isBc"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-base">
                    Old or New Testament
                  </FormLabel>
                  <span className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return beforeChrist();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Did this saint live before the incarnation?
                    </FormDescription>
                  </span>
                  <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                </FormItem>
              </>
            )}
          />

          <span>
            <FormLabel className="text-base">Apostle</FormLabel>
            <FormField
              control={form.control}
              name="isApostle"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint one of the 12 Apostles?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return ofTheTwelveApostles();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Is this saint one of the 12 Apostles?
                    </FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isLxx"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint one of the 70 Apostles?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return ofTheSeventyApostles();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Is this saint one of the 70 Apostles?
                    </FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isEqualToApostle"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint considered Equal to the Apostles?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return equalToTheApostles();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Is this saint considered Equal to the Apostles?
                    </FormDescription>
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
          variant={createSaint.isLoading || isDirty ? "default" : "disabled"}
          className="w-fit"
        >
          {createSaint.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
