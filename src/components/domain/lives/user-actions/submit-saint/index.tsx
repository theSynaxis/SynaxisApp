"use client";

import { useState } from "react";
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
import { Switch } from "~/components/ui/switch";
import { saintLogic } from "./saint-logic";
import { formSchema } from "./formSchema";

// import constants
import {
  BISHOP,
  CONFESSOR,
  DEACON,
  DEACONESS,
  DESPOT,
  DUCHESS,
  DUKE,
  EMPEROR,
  EMPRESS,
  EQUAL_TO_THE_APOSTLES,
  GRAND_PRINCE,
  GRAND_PRINCESS,
  KING,
  MARTYR,
  PASSION_BEARER,
  PATRIARCH,
  PRIEST,
  PRINCE,
  PRINCESS,
  PROPHET,
  QUEEN,
  SEVENTY_APOSTLES,
  TWELVE_APOSTLES,
  isApostle,
  isBc,
  isBishop,
  isConfessor,
  isDeacon,
  isDeaconess,
  isDespot,
  isDuchess,
  isDuke,
  isEmperor,
  isEmpress,
  isEqualToApostle,
  isGrandPrince,
  isGrandPrincess,
  isKing,
  isLevite,
  isLxx,
  isMarried,
  isMartyr,
  isMonk,
  isPassionBearer,
  isPatriarch,
  isPriest,
  isPrince,
  isPrincess,
  isProphet,
  isQueen,
} from "~/lib/constants";

// import types
import { type z } from "zod";

export default function SubmitSaint() {
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isBc: false,
      feastDate: {
        month: 0,
        day: 0,
      },
      yearBorn: undefined,
      yearDied: undefined,
      isProphet: false,
      isApostle: false,
      isLxx: false,
      isEqualToApostle: false,
      isPatriarch: false,
      isBishop: false,
      isPriest: false,
      isDeacon: false,
      isDeaconess: false,
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
      isMartyr: false,
      isConfessor: false,
      isPassionBearer: false,
      isMonk: false,
      isMarried: false,
      isMale: true,
      isLevite: false,
    },
  });

  const {
    formState: { isDirty },
    setValue,
    reset,
    // setError,
  } = form;

  function sex(value: boolean) {
    // if the saint is male, then he cannot have these female titles:
    if (value) {
      setValue(isDeaconess, false);
      setValue(isDuchess, false);
      setValue(isEmpress, false);
      setValue(isGrandPrincess, false);
      setValue(isPrincess, false);
      return setValue(isQueen, false);
    }

    // if the saint is female, then she cannot have these titles:
    setValue(isApostle, false);
    setValue(isLxx, false);
    setValue(isPatriarch, false);
    setValue(isBishop, false);
    setValue(isPriest, false);
    setValue(isDeacon, false);
    setValue(isDespot, false);
    setValue(isDuke, false);
    setValue(isEmperor, false);
    setValue(isGrandPrince, false);
    setValue(isPrince, false);
    return setValue(isKing, false);
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
      if (formData.isDeaconess) return DEACONESS;
      if (formData.isProphet) return PROPHET;
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
    const martyr = () => {
      if (formData.isMartyr) return MARTYR;
      if (formData.isConfessor) return CONFESSOR;
      if (formData.isPassionBearer) return PASSION_BEARER;
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
      martyr: martyr(),
      isMonk: formData.isMonk,
      isMarried: formData.isMarried,
      isMale: formData.isMale,
      isLevite: formData.isLevite,
      yearBorn: formData.yearBorn ?? null,
      yearDied: formData.yearDied ?? null,
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
                  <FormLabel className="text-lg">
                    Saint Name <span className="text-secondary-red-500">*</span>
                  </FormLabel>
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
            <FormLabel className="text-lg">
              Feast Day <span className="text-secondary-red-500">*</span>
            </FormLabel>

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

          <FormField
            control={form.control}
            name="isMale"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start justify-between">
                <FormLabel className="text-lg">
                  Sex <span className="text-secondary-red-500">*</span>
                </FormLabel>
                <FormDescription className="italic">
                  <br />
                </FormDescription>
                <FormControl>
                  <div className="flex flex-row items-center justify-normal gap-4">
                    Female
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onClick={() => {
                        // field.value sends the current value, not the updated value, so we need to pass the opposite to sex().
                        return sex(!field.value);
                      }}
                    />
                    Male
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </span>

        <span>
          <FormLabel className="text-lg">Extra Information</FormLabel>
          <span className="flex flex-row items-center justify-normal gap-12">
            <FormField
              control={form.control}
              name="yearBorn"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">Year Born</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
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
              name="yearDied"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">Year Died</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
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
        <span className="flex flex-row items-start justify-normal gap-32">
          <span className="flex flex-col items-start justify-normal gap-2">
            <FormField
              control={form.control}
              name={isBc}
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
                            return saintLogic(isBc, setValue);
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
            <FormField
              control={form.control}
              name={isProphet}
              render={({ field }) => (
                <>
                  <FormItem>
                    <span className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isProphet, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a prophet?
                      </FormDescription>
                    </span>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name={isLevite}
              render={({ field }) => (
                <>
                  <FormItem>
                    <span className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isLevite, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a Levite?</FormDescription>
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
                name={isApostle}
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
                            return saintLogic(isApostle, setValue);
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
                name={isLxx}
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
                            return saintLogic(isLxx, setValue);
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
                name={isEqualToApostle}
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
                            return saintLogic(isEqualToApostle, setValue);
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

            <span>
              <FormLabel className="text-base">Clergy</FormLabel>
              <FormField
                control={form.control}
                name={isPatriarch}
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
                            return saintLogic(isPatriarch, setValue);
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
                name={isBishop}
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
                            return saintLogic(isBishop, setValue);
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
                name={isPriest}
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
                            return saintLogic(isPriest, setValue);
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
                name={isDeacon}
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
                            return saintLogic(isDeacon, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a deacon?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isDeaconess}
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a deaconess?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isDeaconess, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a deaconess?
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
              <FormLabel className="text-base">Royalty</FormLabel>
              <FormField
                control={form.control}
                name={isDespot}
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
                            return saintLogic(isDespot, setValue);
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
                name={isDuchess}
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
                            return saintLogic(isDuchess, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a duchess?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isDuke}
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
                            return saintLogic(isDuke, setValue);
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
                name={isEmperor}
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
                            return saintLogic(isEmperor, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint an emperor?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isEmpress}
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
                            return saintLogic(isEmpress, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint an empress?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isGrandPrince}
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
                            return saintLogic(isGrandPrince, setValue);
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
                name={isGrandPrincess}
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
                            return saintLogic(isGrandPrincess, setValue);
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
                name={isPrince}
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
                            return saintLogic(isPrince, setValue);
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
                name={isPrincess}
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
                            return saintLogic(isPrincess, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a princess?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isKing}
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
                            return saintLogic(isKing, setValue);
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
                name={isQueen}
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
                            return saintLogic(isQueen, setValue);
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
          <span className="flex flex-col items-start gap-4">
            <span>
              <FormLabel className="text-base">Martyrdom</FormLabel>
              <FormField
                control={form.control}
                name={isMartyr}
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a martyr?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isMartyr, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a martyr?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isConfessor}
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a confessor?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isConfessor, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a confessor?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name={isPassionBearer}
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a passion bearer?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isPassionBearer, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Is this saint a passion bearer?
                      </FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
            </span>
            <span>
              <FormLabel className="text-base">Misc</FormLabel>
              <FormField
                control={form.control}
                name={isMonk}
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Is this saint a monk?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            return saintLogic(isMonk, setValue);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Is this saint a monk?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name={isMarried}
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-center justify-normal gap-2 text-base">
                      <FormLabel className="sr-only">
                        Was this saint married?
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>Was this saint married?</FormDescription>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />
            </span>
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
