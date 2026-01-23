"use client";
import { useActionState } from "react";
import { FieldError } from "../../../components/form/field-error";
import { Form } from "../../../components/form/form";
import { SubmitButton } from "../../../components/form/submit-button";
import { EMPTY_ACTION_STATE } from "../../../components/form/utils/to-action-state";
import { Input } from "../../../components/ui/input";
import { signIn } from "../actions/sign-in";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

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
        type="password"
        name="fake-password"
        autoComplete="current-password"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-0 w-0 overflow-hidden"
      />
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
        autoComplete="current-password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
