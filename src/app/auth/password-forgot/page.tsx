import Link from "next/link";
import { LucideKeyRound, LucideMail } from "lucide-react";
import { buttonVariants } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { signInPath } from "../../paths";

const PasswordForgotPage = () => {
  return (
    <section className="relative flex flex-1 items-center justify-center px-4 font-[var(--font-geist-sans)]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-5rem] top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),rgba(99,102,241,0))] blur-3xl motion-safe:animate-[float-slow_12s_ease-in-out_infinite]" />
        <div className="absolute right-[-6rem] bottom-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2),rgba(14,165,233,0))] blur-3xl motion-safe:animate-[float-slow_14s_ease-in-out_infinite]" />
      </div>

      <div className="w-full max-w-lg rounded-3xl border bg-background/90 p-8 shadow-[0_26px_70px_-50px_rgba(15,23,42,0.5)] backdrop-blur motion-safe:animate-[fade-up_0.6s_ease-out]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-500">
            <LucideKeyRound className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Reset access
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Forgot your password?
            </h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Drop the email tied to your account and we will send a reset link.
        </p>

        <form className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <LucideMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                className="pl-9"
                placeholder="you@company.com"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`${buttonVariants({ variant: "default" })} w-full`}
          >
            Send reset link
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>Remembered your password?</span>
          <Link href={signInPath()} className={buttonVariants({ variant: "link" })}>
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PasswordForgotPage;
