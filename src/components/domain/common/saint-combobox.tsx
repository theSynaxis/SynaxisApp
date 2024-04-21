import { type z } from "zod";
import { faker } from "@faker-js/faker";
import {
  type UseFormSetValue,
  type ControllerRenderProps,
} from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { FormControl } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { type formSchema } from "../sayings/user-actions/submit-quote/formSchema";

// The following is an example of what the type could look like when this component is used in another form in the app:
// import { type formSchema as SaintSchema } from "../lives/user-actions/submit-saint/formSchema";
// type FormSetValue = UseFormSetValue<
//   z.infer<typeof formSchema | typeof SaintSchema>
// >;

type FormSetValue = UseFormSetValue<z.infer<typeof formSchema>>;
type FormField = ControllerRenderProps<z.infer<typeof formSchema>, "saint">;

interface SaintComboboxProps {
  field: FormField;
  setValue: FormSetValue;
}

export default function SaintCombobox(props: SaintComboboxProps) {
  const { field, setValue } = props;
  const saints = [{ value: "0", label: "St Silouan the Athonite (Sept 24)" }];

  const createFakeSaints = (index: number) => {
    const saintName = faker.person.firstName();
    const feastDay = `${faker.date.month()} ${faker.number.int({ min: 1, max: 31 })}`;

    return {
      value: `${index}`,
      label: `St ${saintName} (${feastDay})`,
    };
  };

  for (let index = 1; index < 1000; index++) {
    saints.push(createFakeSaints(index));
  }

  return (
    <>
      <Popover>
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
