"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

// import components
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

export default function BookCombobox() {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

  const formSchema = z.object({
    isbn: z.union([z.string().min(10).max(10), z.string().min(13).max(13)]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isbn: "",
    },
  });

  const {
    formState: { isDirty },
    setValue,
    setError,
    reset,
  } = form;

  const createQuote = api.work.isbnSearch.useMutation({
    onSuccess: (data) => {
      toast({
        title: `Success`,
        description: `${data?.volumeInfo.title} has been submitted!`,
      });
      return reset();
    },
    onError: (e) => {
      return setSubmitError(e.message);
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    createQuote.mutate({
      isbn: formData.isbn,
    });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Quote</DialogTitle>
            <DialogDescription>
              Bring a quote to the attention of our moderation team.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="text-base">
                        Add Book via ISBN
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="ISBN"
                          className="text-black w-full rounded-full px-4 py-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                    </FormItem>
                  </>
                )}
              />

              <DialogFooter>
                <Button
                  variant={
                    createQuote.isLoading || isDirty ? "default" : "disabled"
                  }
                >
                  {createQuote.isLoading ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
