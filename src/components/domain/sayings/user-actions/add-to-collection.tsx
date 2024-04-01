"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import Image from "next/image";

// import components
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export default function AddToCollection() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>Add Quote to Collection</Button>
        </PopoverTrigger>

        <PopoverContent
          className="flex flex-col gap-4 bg-neutral-50"
          align="start"
        >
          <AllCollections />
          <CreateCollection />
        </PopoverContent>
      </Popover>
    </>
  );
}

export function AllCollections() {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <Button
        variant={"link"}
        className="flex w-full flex-row items-center justify-between p-0"
      >
        Hope
        <Image
          src={"/images/icons/Plus-Circle-Icon.svg"}
          alt="Add to Hope"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </Button>
      <Button
        variant={"link"}
        className="flex w-full flex-row items-center justify-between p-0"
      >
        Confession Help
        <Image
          src={"/images/icons/Plus-Circle-Icon.svg"}
          alt="Add to Confession Help"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </Button>
      <Button
        variant={"link"}
        className="flex w-full flex-row items-center justify-between p-0"
      >
        Sunday Homily
        <Image
          src={"/images/icons/Plus-Circle-Icon.svg"}
          alt="Add to Sunday Homily"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </Button>
      <Button
        variant={"link"}
        className="flex w-full flex-row items-center justify-between p-0"
      >
        Thesis
        <Image
          src={"/images/icons/Plus-Circle-Icon.svg"}
          alt="Add to Thesis"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </Button>
      <Button
        variant={"link"}
        className="flex w-full flex-row items-center justify-between p-0"
      >
        St Gregory on Baptism
        <Image
          src={"/images/icons/Plus-Circle-Icon.svg"}
          alt="Add to St Gregory on Baptism"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </Button>
    </div>
  );
}

export function CreateCollection() {
  const formSchema = z.object({
    collection: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collection: "",
    },
  });

  const { setError } = form;

  const createCollection = api.collection.create.useMutation({
    onSuccess: async () => {
      // success toast trigger
    },
    onError: (e) => {
      return setError("collection", { type: "server", message: e.message });
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    createCollection.mutate({
      name: formData.collection,
      userId: "1", // TODO: make dynamic
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-row items-center justify-between gap-2"
        >
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <>
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Add New Collection</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Add New Collection"
                      className="text-black w-full rounded-lg p-4 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                </FormItem>
              </>
            )}
          />

          <Button
            size={"sm"}
            variant={createCollection.isLoading ? "disabled" : "default"}
          >
            {createCollection.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
}
