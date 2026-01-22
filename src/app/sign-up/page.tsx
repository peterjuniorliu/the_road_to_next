import { redirect } from "next/navigation";
import { signUpPath } from "../paths";

const SignUpPage = () => {
  redirect(signUpPath());
};

export default SignUpPage;
