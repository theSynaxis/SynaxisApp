"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import CreateUser from "~/components/domain/users/create-user";

export default function RegistrationModal() {
  const [registrationOpen, setRegistrationOpen] = useState(false);

  return (
    <>
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogTrigger asChild>
          <Button>Register</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Synaxis Account</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col items-start justify-between">
            <CreateUser closeModal={() => setRegistrationOpen(false)} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
