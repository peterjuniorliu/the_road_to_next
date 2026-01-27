import { redirect } from "next/navigation";
import { signInPath } from "../paths";

const AuthPage = () => {
  redirect(signInPath());
};

export default AuthPage;
