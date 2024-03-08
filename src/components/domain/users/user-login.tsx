"use client";

import { useState, type SyntheticEvent } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { loginAction } from "~/lib/actions/login";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface CreateUserProps {
  closeModal?: () => void;
}

export default function UserLogin(props: CreateUserProps) {
  const { closeModal } = props;
  const router = useRouter();
  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState("");

  const formSchema = z.object({
    usernameOrEmail: z.string(),
    password: z.string(),
  });

  function validateFormData(data: typeof formData) {
    const validatedFormData = formSchema.safeParse(data);
    if (!validatedFormData.success) {
      const allErrors = validatedFormData.error.flatten();
      return setErrors({
        usernameOrEmail: allErrors.fieldErrors.usernameOrEmail?.[0] ?? "",
        password: allErrors.fieldErrors.password?.[0] ?? "",
      });
    }

    setErrors({
      usernameOrEmail: "",
      password: "",
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

  const userLogin = api.user.login.useMutation({
    onSuccess: async (data) => {
      await loginAction(data); // sets cookie data
      setFormData({
        usernameOrEmail: "",
        password: "",
      });

      if (closeModal) return closeModal();

      router.push("/apps");
    },
    onError: (e) => setSubmitError(e.message),
  });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    userLogin.mutate({
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    });
  }

  /* TODO: handle reset password"
   * Generate a unique token for the password reset request.
   * Associate this token with the user in your database, and set an expiry time for it.
   * Send an email to the user with a link containing this token.
   * When the user clicks the link, verify the token and its expiry time.
   * If the token is valid, allow the user to enter a new password.
   *
   * Logic is same for email verification, except toggle isVerified in db to true
   */

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <Input
        type="text"
        placeholder="Username or Email"
        value={formData.usernameOrEmail}
        onChange={(e) => handleChange("usernameOrEmail", e.target.value)}
        className="text-black w-full rounded-full px-4 py-2"
      />

      {errors.usernameOrEmail && (
        <p className="pl-4 font-bold text-secondary-red-500">
          {errors.usernameOrEmail}
        </p>
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

      {submitError && (
        <p className="pl-4 font-bold text-secondary-red-500">{submitError}</p>
      )}

      <Button disabled={userLogin.isLoading}>
        {userLogin.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
