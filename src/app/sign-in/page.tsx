import { redirect } from "next/navigation";
import { signInPath } from "../paths";

const SignInPage = () => {
  redirect(signInPath());
};

export default SignInPage;
