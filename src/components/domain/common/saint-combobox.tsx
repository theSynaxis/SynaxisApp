"use client";

import { useState } from "react";
import Image from "next/image";
import {
  type UseFormSetValue,
  type ControllerRenderProps,
} from "react-hook-form";

// import components
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { FormControl } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

// import types
import { type z } from "zod";
import { type formSchema as SubmitQuoteSchema } from "../sayings/user-actions/submit-quote/formSchema";
import { type formSchema as PatronSaintSchema } from "../users/settings/account/formSchema";

type FormSetValue = UseFormSetValue<
  z.infer<typeof SubmitQuoteSchema | typeof PatronSaintSchema>
>;
type FormField = ControllerRenderProps<
  z.infer<typeof SubmitQuoteSchema>,
  "saint"
>;

interface SaintComboboxProps {
  field: FormField;
  setValue: FormSetValue;
}

export default function SaintCombobox(props: SaintComboboxProps) {
  const { field, setValue } = props;
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = api.saint.list.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>ERROR</p>;

  const saints = data.map((saint) => {
    return {
      value: saint.id,
      label: `St. ${saint.name} (${saint.feastDate})`,
    };
  });

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {field.value
                ? saints.find((saint) => Number(saint.value) === field.value)
                    ?.label
                : "Select saint"}
              <Image
                src={`/images/icons/Chevrons-Up-Down-Icon.svg`}
                alt={"Selection"}
                className="ml-2 h-4 w-4 text-neutral-900"
                height={20}
                width={20}
                aria-hidden="true"
              />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-fit bg-neutral-50 p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search saint..."
              className="text-black w-full rounded-lg bg-neutral-50 px-4 py-2 text-lg"
            />
            <CommandEmpty>No saint found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {saints.map((saint) => (
                  <CommandItem
                    value={saint.label}
                    key={saint.value}
                    className="cursor-pointer text-lg font-bold"
                    onSelect={() => {
                      setValue("saint", Number(saint.value));
                      setOpen(false);
                    }}
                  >
                    <Image
                      src={`/images/icons/Check-Icon.svg`}
                      alt={"Check"}
                      height={14}
                      width={14}
                      aria-hidden="true"
                      className={cn(
                        "mr-2 h-4 w-4",
                        Number(saint.value) === field.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {saint.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
