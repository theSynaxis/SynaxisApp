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
import UserLogin from "~/components/domain/users/user-login";

export default function LoginModal() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to Your Synaxis Account</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col items-start justify-between">
            <UserLogin closeModal={() => setLoginOpen(false)} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
