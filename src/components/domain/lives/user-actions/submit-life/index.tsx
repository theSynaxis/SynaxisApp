"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { TextEditor } from "~/components/ui/text-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

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

  const { reset } = form;

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
    // formData.life = JSON.stringify(editorRef.current.getEditorState());

    // const editor: LexicalEditor = editorRef.current;

    // const readed = editor.read(() => {
    //   return;
    // });

    // console.log(`${readed}`);

    // editor.registerUpdateListener(({ editorState }) => {
    //   editorState.read(() => {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    //     const html = $generateHtmlFromNodes(editor, null);
    //     onChange(`${html}`);
    //   });
    // });
    // console.log(
    //   `editor state: ${JSON.stringify(editorRef.current.getEditorState(), null, 2)}`,
    // );
    addSaintLife.mutate({
      id: formData.id,
      name: formData.name,
      life: formData.life,
    });
  }

  // const editorRef: unknown = useRef();

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
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <TextEditor {...field} previewHeader={saintName} />
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
