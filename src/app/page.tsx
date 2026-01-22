import { redirect } from "next/navigation";
import { signInPath } from "./paths";

const RootPage = () => {
  redirect(signInPath());
};

export default RootPage;
