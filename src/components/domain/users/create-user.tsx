"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z, type ZodError } from "zod";

import { api } from "~/trpc/react";
import { Button } from "../../ui/button";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function CreateUser() {
  const router = useRouter();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const validateSchema = z
    .object({
      username: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmpassword"],
    });

  function validateFormData(data: FormData) {
    const validatedFormData = validateSchema.safeParse(data);
    if (!validatedFormData.success) {
      const allErrors = validatedFormData.error.flatten();
      setErrors({
        username: allErrors.fieldErrors.username?.[0] ?? "",
        email: allErrors.fieldErrors.email?.[0] ?? "",
        password: allErrors.fieldErrors.password?.[0] ?? "",
      });
    }
    return validatedFormData.success;
  }

  async function handleChange(name: string, value: string): Promise<void> {
    setFormData({
      ...formData,
      [name]: value,
    });
    validateFormData(formData);
  }

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setFormData({ username: "", email: "", password: "" });
    },
  });

  // TODO: fix validation rules
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
        onChange={(e) => handleChange("username", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      {errors.username && <p>{errors.username}</p>}
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      {errors.password && <p>{errors.password}</p>}

      <Button disabled={createUser.isLoading}>
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
