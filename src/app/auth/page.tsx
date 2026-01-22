import Link from "next/link";
import {
  LucideBadgeCheck,
  LucideMoonStar,
  LucideShieldCheck,
  LucideSparkles,
  LucideTicket,
  LucideZap,
} from "lucide-react";
import { buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { passwordForgotPath, signInPath, signUpPath } from "../paths";

type AuthPageProps = {
  searchParams?: {
    mode?: string;
  };
};

const AuthPage = ({ searchParams }: AuthPageProps) => {
  const mode = searchParams?.mode === "signin" ? "signin" : "signup";
  const signUpActive = mode === "signup";

  return (
    <section className="relative flex flex-1 items-center justify-center px-4 font-[var(--font-geist-sans)]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(251,191,36,0))] blur-3xl motion-safe:animate-[float-slow_10s_ease-in-out_infinite]" />
        <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.2),rgba(74,222,128,0))] blur-3xl motion-safe:animate-[float-slow_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),rgba(56,189,248,0))] blur-3xl motion-safe:animate-[float-slow_14s_ease-in-out_infinite]" />
      </div>

      <div className="w-full max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              TicketBounty Access
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Sign up or sign in
            </h1>
          </div>
          <div className="flex gap-2">
            <Link
              href={signUpPath()}
              className={buttonVariants({
                variant: signUpActive ? "default" : "outline",
              })}
            >
              Sign up
            </Link>
            <Link
              href={signInPath()}
              className={buttonVariants({
                variant: signUpActive ? "outline" : "default",
              })}
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div
            className={`rounded-3xl border p-7 shadow-[0_28px_70px_-55px_rgba(15,23,42,0.45)] backdrop-blur motion-safe:animate-[fade-up_0.6s_ease-out] ${
              signUpActive
                ? "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 ring-2 ring-amber-200"
                : "bg-background/90 opacity-90"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/70 text-amber-900">
                <LucideSparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-700/80">
                  Sign up
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Build your bounty desk
                </h2>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Create your workspace and start shaping the ticket pipeline.
            </p>
            <div className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" name="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" name="email" type="email" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm</Label>
                  <Input id="signup-confirm" name="confirm" type="password" />
                </div>
              </div>
              <button
                type="button"
                className={`${buttonVariants({ variant: "default" })} w-full`}
              >
                Create account
              </button>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <LucideZap className="h-4 w-4 text-amber-600" />
                <span>Instant ticket creation with bounty hints.</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideShieldCheck className="h-4 w-4 text-amber-600" />
                <span>Secure sessions and clean handoff history.</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideBadgeCheck className="h-4 w-4 text-amber-600" />
                <span>Track progress with a clear status pipeline.</span>
              </div>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              Already have access?{" "}
              <Link href={signInPath()} className={buttonVariants({ variant: "link" })}>
                Sign in
              </Link>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-7 shadow-[0_28px_75px_-55px_rgba(15,23,42,0.5)] backdrop-blur motion-safe:animate-[fade-up_0.6s_ease-out] ${
              signUpActive
                ? "bg-background/90 opacity-90"
                : "bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white ring-2 ring-emerald-400/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <LucideMoonStar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                  Sign in
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Keep your flow moving
                </h2>
              </div>
            </div>
            <p
              className={`mt-3 text-sm ${
                signUpActive ? "text-muted-foreground" : "text-emerald-100/80"
              }`}
            >
              Return to your active bounties and keep the board alive.
            </p>
            <div className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" name="email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" name="password" type="password" />
              </div>
              <div
                className={`flex items-center justify-between text-xs ${
                  signUpActive ? "text-muted-foreground" : "text-emerald-100/70"
                }`}
              >
                <label className="flex items-center gap-2">
                  <input
                    className="h-4 w-4 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
                    type="checkbox"
                    name="remember"
                  />
                  Remember me
                </label>
                <Link
                  href={passwordForgotPath()}
                  className={buttonVariants({ variant: "link" })}
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="button"
                className={`${buttonVariants({ variant: "default" })} w-full`}
              >
                Sign in
              </button>
            </div>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                  <LucideTicket className="h-4 w-4 text-emerald-200" />
                </div>
                <span>Pin high bounty tickets to the top.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                  <LucideShieldCheck className="h-4 w-4 text-emerald-200" />
                </div>
                <span>Keep sessions encrypted and short-lived.</span>
              </div>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              New here?{" "}
              <Link href={signUpPath()} className={buttonVariants({ variant: "link" })}>
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
