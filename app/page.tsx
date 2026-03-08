import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const RightArrow = (
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );

  const DashboardIcon = (
    <svg
      className="h-4 w-4 group-hover:text-foreground transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-0 left-1/2 -z-10 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px] dark:bg-primary/10"></div>
      <div className="absolute bottom-0 right-1/4 -z-10 h-120 w-120 translate-y-1/3 rounded-full bg-accent/20 blur-[100px] dark:bg-accent/10"></div>

      <main className="z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Badge
          variant="primary"
          className="mb-8 px-3 py-1 text-sm backdrop-blur-sm"
        >
          Welcome to Dashboard
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          Manage Your Work <br className="hidden md:block" />
          <span className="text-gradient">With Elegance</span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg md:text-xl text-surface-500 dark:text-surface-400 mb-10 leading-relaxed">
          Experience a sleek, modern, and high-performance dashboard designed to
          boost your productivity. Secure, fast, and beautiful.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login" tabIndex={-1}>
            <Button
              variant="primary"
              size="lg"
              rightIcon={RightArrow}
              className="group w-full sm:w-auto"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/dashboard" tabIndex={-1}>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={DashboardIcon}
              className="group w-full sm:w-auto dark:bg-surface-800"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
