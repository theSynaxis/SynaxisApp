import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Image from "next/image";

// import components
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import SaintCombobox from "../../../common/saint-combobox";
import { formSchema } from "./formSchema";

// import types
import { type z } from "zod";

export default function AccountSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      saint: 0,
      firstName: "",
      lastName: "",
    },
  });

  const {
    formState: { isDirty },
    setValue,
    setError,
  } = form;

  const userLogin = api.user.login.useMutation({
    onSuccess: async (data) => {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="bg-slate-950 mt-2 w-[340px] rounded-md p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    },
    onError: (e) => {
      return setError("patron", { type: "server", message: e.message });
    },
  });

  function onSubmit() {
    userLogin.mutate({
      usernameOrEmail: "formData.username",
      password: "formData.email",
    });
  }

  return (
    <div className="w-full">
      <h3>Account</h3>
      <p>Update your account settings.</p>

      <Separator className="mt-4 w-2/3 border border-b-0 border-l-0 border-r-0 p-2" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <span className="flex w-full flex-row items-center justify-start gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="text-black w-[200px] rounded-lg px-4 py-2"
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
              name="lastName"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="text-black w-[200px] rounded-lg px-4 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
          </span>

          <span className="flex w-full flex-row items-center justify-start gap-8">
            <FormField
              control={form.control}
              name="saint"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">Patron Saint</FormLabel>
                    <SaintCombobox field={field} setValue={setValue} />
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex w-1/3 flex-col">
                  <FormLabel className="text-base">Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] bg-white pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Image
                            src={"/images/icons/Calendar-Icon.svg"}
                            alt="Calendar"
                            width={16}
                            height={16}
                            className="ml-auto h-4 w-4"
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto bg-neutral-50 p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>

          <span className="flex flex-row items-center justify-start gap-8">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">Sex</FormLabel>
                    <FormControl>
                      <RadioGroup {...field} className="w-[200px]">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="male"
                            id="male"
                            className="bg-white"
                          />
                          <Label htmlFor="male" className="text-base">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="female"
                            id="female"
                            className="bg-white"
                          />
                          <Label htmlFor="female" className="text-base">
                            Female
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-base">Zip Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Zip Code"
                        className="text-black w-[200px] rounded-lg px-4 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                  </FormItem>
                </>
              )}
            />
          </span>

          <Button
            variant={userLogin.isLoading || isDirty ? "default" : "disabled"}
            className="mt-4 w-fit"
          >
            {userLogin.isLoading ? "Submitting..." : "Update Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
