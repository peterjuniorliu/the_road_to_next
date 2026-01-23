"use client";
import { useActionState } from "react";
import { FieldError } from "../../../components/form/field-error";
import { Form } from "../../../components/form/form";
import { SubmitButton } from "../../../components/form/submit-button";
import { EMPTY_ACTION_STATE } from "../../../components/form/utils/to-action-state";
import { Input } from "../../../components/ui/input";
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <input
        type="text"
        name="fake-username"
        autoComplete="username"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-0 w-0 overflow-hidden"
      />
      <input
        type="email"
        name="fake-email"
        autoComplete="email"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-0 w-0 overflow-hidden"
      />
      <input
        type="password"
        name="fake-password"
        autoComplete="new-password"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-0 w-0 overflow-hidden"
      />
      <Input
        name="username"
        placeholder="Username"
        autoComplete="username"
        autoCapitalize="none"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} name="username" />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        inputMode="email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        autoComplete="new-password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
