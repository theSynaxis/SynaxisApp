"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";

// import types
import { z } from "zod";
import { TextEditor } from "~/components/ui/text-editor";

interface SubmitSaintProps {
  id: number;
  name: string;
  [x: string]: unknown;
}

export default function SubmitLife(props: SubmitSaintProps) {
  const { id: saintId, name: saintName } = props;
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState("");

  const formSchema = z.object({
    id: z.number(),
    name: z.string().min(3),
    life: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: saintId,
      name: saintName,
      life: "",
    },
  });

  const { formState, reset } = form;

  const addSaintLife = api.saint.addLife.useMutation({
    onSuccess: (_data, variables) => {
      toast({
        title: `Success`,
        description: `The life of St. ${variables.name} has been submitted!`,
      });
      return reset();
    },
    onError: (e) => {
      return setSubmitError(e.message);
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    formData.life = JSON.stringify(editorRef.current.getEditorState());
    addSaintLife.mutate({
      id: formData.id,
      name: formData.name,
      life: formData.life,
    });
  }

  const editorRef: unknown = useRef();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-12"
      >
        <span>
          <FormField
            control={form.control}
            name="life"
            render={() => (
              <>
                <FormItem>
                  <FormControl>
                    <TextEditor ref={editorRef} />
                  </FormControl>
                  <FormMessage className="pl-4 font-bold text-secondary-red-500" />
                </FormItem>
              </>
            )}
          />
        </span>

        {submitError && (
          <p className="pl-4 font-bold text-secondary-red-500">{submitError}</p>
        )}

        <Button className="w-fit">
          {addSaintLife.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
