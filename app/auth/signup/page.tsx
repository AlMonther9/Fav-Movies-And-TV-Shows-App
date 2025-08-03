import { SignUpForm } from "@/components/auth/signup-form";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function SignUpPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black p-4">
        {/* Animated background grid */}
        <div className="fixed inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>

        <div className="relative z-10">
          <SignUpForm />
        </div>
      </div>
    </AuthGuard>
  );
}
