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
  BISHOP,
  DEACON,
  DESPOT,
  DUCHESS,
  DUKE,
  EMPEROR,
  EMPRESS,
  EQUAL_TO_THE_APOSTLES,
  GRAND_PRINCE,
  GRAND_PRINCESS,
  KING,
  PATRIARCH,
  PRIEST,
  PRINCE,
  PRINCESS,
  QUEEN,
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
    isPatriarch: z.boolean(),
    isBishop: z.boolean(),
    isPriest: z.boolean(),
    isDeacon: z.boolean(),
    isDespot: z.boolean(),
    isDuchess: z.boolean(),
    isDuke: z.boolean(),
    isEmperor: z.boolean(),
    isEmpress: z.boolean(),
    isGrandPrince: z.boolean(),
    isGrandPrincess: z.boolean(),
    isPrince: z.boolean(),
    isPrincess: z.boolean(),
    isKing: z.boolean(),
    isQueen: z.boolean(),
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
      isPatriarch: false,
      isBishop: false,
      isPriest: false,
      isDeacon: false,
      isDespot: false,
      isDuchess: false,
      isDuke: false,
      isEmperor: false,
      isEmpress: false,
      isGrandPrince: false,
      isGrandPrincess: false,
      isPrince: false,
      isPrincess: false,
      isKing: false,
      isQueen: false,
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
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isEqualToApostle", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    return setValue("isPrincess", false);
  }

  function ofTheTwelveApostles() {
    // if the saint is an Apostle, then he isn't the following things too
    setValue("isBc", false);
    setValue("isLxx", false);
    setValue("isEqualToApostle", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function ofTheSeventyApostles() {
    // if the saint is one of the 70, then he isn't the following things too
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isEqualToApostle", false);
    setValue("isPatriarch", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function equalToTheApostles() {
    // if the saint is Equal to the Apostles, then he isn't the following things too
    setValue("isBc", false);
    setValue("isApostle", false);
    return setValue("isLxx", false);
  }

  function patriarch() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function bishop() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isPatriarch", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function priest() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function deacon() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function despot() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function duchess() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function duke() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function emperor() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function empress() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function grandPrince() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function grandPrincess() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function prince() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function princess() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isKing", false);
    return setValue("isQueen", false);
  }

  function king() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    return setValue("isQueen", false);
  }

  function queen() {
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    return setValue("isKing", false);
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
    const clergy = () => {
      if (formData.isPatriarch) return PATRIARCH;
      if (formData.isBishop) return BISHOP;
      if (formData.isPriest) return PRIEST;
      if (formData.isDeacon) return DEACON;
      return null;
    };
    const royalty = () => {
      if (formData.isDespot) return DESPOT;
      if (formData.isDuchess) return DUCHESS;
      if (formData.isDuke) return DUKE;
      if (formData.isEmperor) return EMPEROR;
      if (formData.isEmpress) return EMPRESS;
      if (formData.isGrandPrince) return GRAND_PRINCE;
      if (formData.isGrandPrincess) return GRAND_PRINCESS;
      if (formData.isPrince) return PRINCE;
      if (formData.isPrincess) return PRINCESS;
      if (formData.isKing) return KING;
      if (formData.isQueen) return QUEEN;
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
      clergy: clergy(),
      royal: royalty(),
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

        <FormLabel className="text-lg">Extra Information</FormLabel>
        <span className="flex flex-row items-start justify-normal gap-32">
          <span className="flex flex-col items-start justify-normal gap-4">
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

          <span className="flex flex-col items-start justify-normal gap-8">
            <span>
              <FormLabel className="text-base">Clergy</FormLabel>
              <FormField
                control={form.control}
                name="isPatriarch"
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a Patriarch?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return patriarch();
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a Patriarch?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="isBishop"
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a bishop?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return bishop();
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a bishop?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="isPriest"
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a priest?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return priest();
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a priest?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="isDeacon"
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a deacon?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return deacon();
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a deacon?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
            </span>
          </span>
          <span>
            <FormLabel className="text-base">Royalty</FormLabel>
            <FormField
              control={form.control}
              name="isDespot"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a despot?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return despot();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a despot?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isDuchess"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a duchess?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return duchess();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a duchess?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isDuke"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a duke?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return duke();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a duke?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isEmperor"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint an emperor?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return emperor();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint an emperor?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isEmpress"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint an empress?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return empress();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint an empress?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isGrandPrince"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a grand prince?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return grandPrince();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Is this saint a grand prince?
                    </FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isGrandPrincess"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a grand princess?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return grandPrincess();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Is this saint a grand princess?
                    </FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isPrince"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a prince?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return prince();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a prince?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isPrincess"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a princess?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return princess();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a princess?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isKing"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a king?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return king();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a king?</FormDescription>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="isQueen"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                    <FormLabel className="sr-only">
                      Is this saint a queen?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onClick={() => {
                          return queen();
                        }}
                      />
                    </FormControl>
                    <FormDescription>Is this saint a queen?</FormDescription>
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
