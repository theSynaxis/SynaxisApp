"use client";

import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { z } from "zod";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface CreateUserProps {
  closeModal?: () => void;
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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState("");

  const formSchema = z
    .object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });

  function validateFormData(data: typeof formData) {
    const validatedFormData = formSchema.safeParse(data);
    if (!validatedFormData.success) {
      const allErrors = validatedFormData.error.flatten();
      return setErrors({
        username: allErrors.fieldErrors.username?.[0] ?? "",
        email: allErrors.fieldErrors.email?.[0] ?? "",
        password: allErrors.fieldErrors.password?.[0] ?? "",
        confirmPassword: allErrors.fieldErrors.confirmPassword?.[0] ?? "",
      });
    }

    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    return validatedFormData.success;
  }

  async function handleChange(name: string, value: string): Promise<void> {
    const updatedFormData = { ...formData, [name]: value };
    setFormData({
      ...formData,
      [name]: value,
    });
    validateFormData(updatedFormData);
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
      switch (e.message) {
        case "Username taken.":
          return setErrors({ ...errors, username: e.message });
        case "Email taken.":
          return setErrors({ ...errors, email: e.message });
        default:
          return setSubmitError(e.message);
      }
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

  // TODO: add logic for secure passwords:
  // example:
  // minLength: 8,
  // minLowercase: 1,
  // minUppercase: 1,
  // minNumbers: 1,
  // minSymbols: 1,

  // TODO: add email verification

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <Input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />

      {errors.username && (
        <p className="pl-4 font-bold text-secondary-red-500">
          {errors.username}
        </p>
      )}

      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />

      {errors.email && (
        <p className="pl-4 font-bold text-secondary-red-500">{errors.email}</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />

      {errors.password && (
        <p className="pl-4 font-bold text-secondary-red-500">
          {errors.password}
        </p>
      )}

      <Input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />

      {errors.confirmPassword && (
        <p className="pl-4 font-bold text-secondary-red-500">
          {errors.confirmPassword}
        </p>
      )}

      {submitError && (
        <p className="pl-4 font-bold text-secondary-red-500">{submitError}</p>
      )}

      <Button disabled={createUser.isLoading}>
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
