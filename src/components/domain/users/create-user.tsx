"use client";

import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { z } from "zod";

import { api } from "~/trpc/react";
import { Button } from "../../ui/button";

interface CreateUserProps {
  closeModal?: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateUser(props: CreateUserProps) {
  const { closeModal } = props;
  const router = useRouter();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState("");

  const validateSchema = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password !== data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });

  function validateFormData(data: FormData) {
    const validatedFormData = validateSchema.safeParse(data);
    if (!validatedFormData.success) {
      const allErrors = validatedFormData.error.flatten();
      setErrors({
        username: allErrors.fieldErrors.username?.[0] ?? "",
        email: allErrors.fieldErrors.email?.[0] ?? "",
        password: allErrors.fieldErrors.password?.[0] ?? "",
        confirmPassword: allErrors.fieldErrors.confirmPassword?.[0] ?? "",
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
      router.push("/apps/login");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      if (closeModal) return closeModal();
    },
    onError: (e) => {
      setSubmitError(e.message);
    },
  });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    createUser.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  }

  // TODO: fix validation rules
  // TODO: add error handling
  // TODO: add error messages
  // TODO: add logic for unique usernames
  // TODO: add logic for secure passwords

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      {submitError && <p>{submitError}</p>}
      <Button disabled={createUser.isLoading}>
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
