"use client";

import * as React from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Image from "next/image";

interface ComboboxProps {
  items: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  classes?: {
    button?: string;
    input?: string;
  };
}

export function Combobox(props: ComboboxProps) {
  const { items, placeholder } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <Image
            src={`/images/icons/Chevrons-Up-Down-Icon.svg`}
            alt={"Selection"}
            className="ml-2 h-4 w-4 text-neutral-900"
            height={20}
            width={20}
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-neutral-50 p-0" align="start">
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="text-black w-full rounded-lg bg-neutral-50 px-4 py-2 text-lg"
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  className="text-lg font-bold"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
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
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
