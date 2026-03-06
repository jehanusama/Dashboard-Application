"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { setCredentials } from "@/store/authSlice";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

import { validateEmail, validatePassword } from "@/lib/utils/validators";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    const eError = validateEmail(email);
    const pError = validatePassword(password);

    if (eError || pError) {
      setEmailError(eError);
      setPasswordError(pError);
      return;
    }

    setIsLoading(true);

    try {
      const { user, token } = await login(email, password);
      dispatch(setCredentials({ user, token }));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const EmailIcon = (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  );

  const LockIcon = (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-4 sm:px-6 lg:px-8">
      
      <div className="absolute top-0 right-0 -z-10 h-120 w-120 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
      <div className="absolute bottom-0 left-0 -z-10 h-120 w-120 -translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-[120px] dark:bg-accent/10" />

      <div className="w-full max-w-md">
        
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block mb-6 transition-transform hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-primary to-accent text-white shadow-lg mx-auto">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-surface-500">
            Please enter your details to sign in.
          </p>
        </div>

        
        <Card className="shadow-premium rounded-3xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-50" />

          <CardContent className="pt-8 sm:px-10 sm:pb-10">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="admin@test.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={EmailIcon}
                  className="bg-transparent"
                  error={emailError ?? undefined}
                />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={LockIcon}
                  className="bg-transparent"
                  error={passwordError ?? undefined}
                />
              </div>

              
              <div
                className={`overflow-hidden transition-all duration-300 ${error ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <Badge
                  variant="error"
                  className="w-full justify-start gap-2 px-3 py-2 text-sm rounded-lg"
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </Badge>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full text-base"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-surface-500">
          <Link href="/" className="transition-colors hover:text-foreground">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
