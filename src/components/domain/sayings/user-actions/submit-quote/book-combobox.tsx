"use client";

import { useState } from "react";
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
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

export default function BookCombobox() {
  // isbn search cannot be a form, proper.
  // if this form is nested in the larger SubmitQuote form
  // submitting this form will trigger submit for that form
  // there are "solutions" online but I don't have the patience today
  const [isbnValue, setIsbnValue] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [addBookOpen, setAddBookOpen] = useState(false);
  const { toast } = useToast();

  const createBook = api.work.create.useMutation({
    onSuccess: (data) => {
      toast({
        title: `Success`,
        description: `${data?.title} has been submitted!`,
      });
      return setAddBookOpen(false);
    },
    onError: (e) => {
      return setSubmitError(e.message);
    },
  });

  const searchIsbn = api.work.isbnSearch.useMutation({
    onSuccess: (data, variables) => {
      return createBook.mutate({
        title: data.title,
        authorId: null, // TODO: add authorId to connect with saints later
        authors: data.authors,
        isbn: variables.isbn,
        blurb: data.blurb ?? null,
        coverImage: data.coverImage,
        publisher: data.publisher ?? "Unknown", // TODO: admin dashboard should filter by unknowns to fix
        publicationYear: data.publicationYear,
        publicationCity: data.publicationCity ?? "Unknown", // TODO: admin dashboard should filter by unknowns to fix
      });
    },
    onError: (e) => {
      // TODO: duplicate key value violates unique constraint "synaxis-app_works_isbn_unique" to return user friendly error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      return setSubmitError(JSON.parse(e.message)[0].message);
    },
  });

  function onSubmit(isbn: string) {
    searchIsbn.mutate({
      isbn: isbn,
    });
  }

  return (
    <>
      <Dialog open={addBookOpen} onOpenChange={setAddBookOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setAddBookOpen(true)}>Add Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit a New Book</DialogTitle>
            <DialogDescription>
              Our list of approved books are ever expanding. Help us out by
              adding one!
            </DialogDescription>
          </DialogHeader>

          <Input
            type="text"
            placeholder="ISBN"
            className="text-black w-full rounded-full px-4 py-2"
            value={isbnValue}
            onChange={(e) => setIsbnValue(e.target.value)}
          />

          {submitError && (
            <p className="pl-4 font-bold text-secondary-red-500">
              {submitError}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant={searchIsbn.isLoading ? "disabled" : "default"}
              onClick={() => onSubmit(isbnValue)}
            >
              {searchIsbn.isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
