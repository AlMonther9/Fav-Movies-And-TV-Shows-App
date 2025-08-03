"use client";

import type React from "react";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Github, Mail, Zap, UserPlus, Shield } from "lucide-react";
import Link from "next/link";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "⚠️ Password Mismatch",
        description: "Passwords do not match. Please try again.",
        className:
          "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        toast({
          title: "🎉 Account Created!",
          description: "Welcome to CyberLib! Signing you in...",
          className:
            "border-green-500/50 bg-white/90 dark:bg-black/90 text-green-600 dark:text-green-100",
        });

        // Automatically sign in after successful registration
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/");
          router.refresh();
        }
      } else {
        const data = await response.json();
        toast({
          title: "🚫 Registration Failed",
          description:
            data.error || "Failed to create account. Please try again.",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
      }
    } catch (error) {
      toast({
        title: "⚠️ Error",
        description: "Something went wrong. Please try again.",
        className:
          "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      toast({
        title: "⚠️ Error",
        description: "Failed to sign up with provider. Please try again.",
        className:
          "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-cyan-500/20 dark:border-cyan-500/20 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-cyan-500 dark:text-cyan-400 animate-pulse" />
          <CardTitle className="text-2xl bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Join CyberLib
          </CardTitle>
          <Zap className="w-5 h-5 text-yellow-500 dark:text-yellow-400 animate-bounce" />
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Create your digital entertainment vault
        </CardDescription>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent mx-auto animate-pulse" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* OAuth Providers */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignIn("google")}
            disabled={isLoading}
            className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 mr-2 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignIn("github")}
            disabled={isLoading}
            className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <Separator className="my-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white dark:bg-black px-2 text-xs text-gray-500 dark:text-gray-400">
              OR CREATE WITH EMAIL
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-green-600 dark:text-green-400 font-semibold"
            >
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name..."
              required
              className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500/20 dark:focus:ring-green-500/20 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-cyan-600 dark:text-cyan-400 font-semibold"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-purple-600 dark:text-purple-400 font-semibold"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password..."
                required
                minLength={6}
                className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20 dark:focus:ring-purple-500/20 transition-all duration-300 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-pink-600 dark:text-pink-400 font-semibold"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password..."
                required
                minLength={6}
                className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20 dark:focus:ring-pink-500/20 transition-all duration-300 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/25 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Create Account
                <Zap className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
          </span>
          <Link
            href="/auth/signin"
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-semibold transition-colors duration-300"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
