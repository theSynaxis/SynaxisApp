"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateUser() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setUsername("");
      setEmail("");
      setPassword("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser.mutate({ username, email, password });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      <button
        type="submit"
        className="bg-white/10 hover:bg-white/20 rounded-full px-10 py-3 font-semibold transition"
        disabled={createUser.isLoading}
      >
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
