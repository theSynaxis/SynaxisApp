"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";

export default function CreateUser() {
  const router = useRouter();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setFormData({ username: "", email: "", password: "" });
    },
    onError(error) {
      // error = [
      //   {
      //     "code": "too_small",
      //     "minimum": 1,
      //     "type": "string",
      //     "inclusive": true,
      //     "exact": false,
      //     "message": "String must contain at least 1 character(s)",
      //     "path": [
      //       "username"
      //     ]
      //   }
      // ]
      // error.map((err) => {
      //   if (err.path === "username") {
      //     setErrors({ ...errors, username: err.message });
      //   }
      // });
      // if (error.data?.path === "username")
      //   setErrors({ ...errors, username: error.data.zodError });
      setError(error.message);
    },
  });

  // TODO: add validation rules
  // TODO: add error handling
  // TODO: add error messages
  // TODO: add logic for unique usernames
  // TODO: add logic for secure passwords

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser.mutate({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }}
      className="flex w-full flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        className="text-black w-full rounded-full px-4 py-2"
      />
      {/* {error && <p>{error}</p>} */}
      {errors.username && <p>{errors.username}</p>}
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="text-black w-full rounded-full px-4 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="text-black w-full rounded-full px-4 py-2"
      />

      <Button disabled={createUser.isLoading}>
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
