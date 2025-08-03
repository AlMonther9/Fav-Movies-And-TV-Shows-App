"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Film,
  Zap,
  Shield,
  Search,
  Infinity,
  Smartphone,
  Star,
  Users,
  Database,
  Palette,
  ArrowRight,
  Play,
  Github,
  Mail,
} from "lucide-react";
import Link from "next/link";

export function LandingPage() {
  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Personal Collection",
      description:
        "Build your own digital library of favorite movies and TV shows with detailed information.",
      color: "text-cyan-500 dark:text-cyan-400",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Search",
      description:
        "Find your content instantly with powerful search and filtering capabilities.",
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      icon: <Infinity className="w-6 h-6" />,
      title: "Infinite Scroll",
      description:
        "Seamlessly browse through your collection with smooth infinite scrolling.",
      color: "text-pink-500 dark:text-pink-400",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security and authentication.",
      color: "text-green-500 dark:text-green-400",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Responsive Design",
      description:
        "Access your collection anywhere with our mobile-first responsive design.",
      color: "text-yellow-500 dark:text-yellow-400",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Cyberpunk Theme",
      description:
        "Immerse yourself in a futuristic interface with dark/light theme support.",
      color: "text-blue-500 dark:text-blue-400",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Movies & Shows",
      icon: <Film className="w-5 h-5" />,
    },
    {
      number: "5K+",
      label: "Active Users",
      icon: <Users className="w-5 h-5" />,
    },
    { number: "99.9%", label: "Uptime", icon: <Zap className="w-5 h-5" /> },
    {
      number: "4.9★",
      label: "User Rating",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-500">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Film className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                CyberLib
              </span>
            </div>
              </div>

              <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden sm:flex gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-cyan-500/30 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all duration-300 bg-transparent"
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0 group"
              >
                <Link href="/auth/signup">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="border-cyan-500/30 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all duration-300 bg-transparent"
              >
                <Link href="/auth/signin">
                  <span className="sr-only">Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <Badge
                variant="outline"
                className="border-cyan-500/30 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 px-4 py-2 text-sm bg-cyan-50/50 dark:bg-cyan-500/10"
              >
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Welcome to the Future of Entertainment
              </Badge>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-pulse">
                  CYBER
                </span>
                <span className="text-gray-900 dark:text-white">LIB</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your personal digital entertainment vault in the{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  neon-lit future
                </span>
                . Organize, discover, and manage your favorite movies and TV
                shows like never before.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/25 transition-all duration-300 group px-8 py-6 text-lg"
                >
                  <Link href="/auth/signup">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Start Your Collection
                    <Zap className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 px-8 py-6 text-lg bg-transparent"
                >
                  <Link href="#features">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center items-center gap-2 text-cyan-500 dark:text-cyan-400">
                      {stat.icon}
                      <span className="text-3xl font-bold">{stat.number}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-gray-50/50 dark:bg-gray-900/50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to build and manage your digital
                entertainment collection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-black/40 backdrop-blur-sm hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/10"
                >
                  <CardHeader>
                    <div
                      className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get started with CyberLib in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Sign Up
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your account with email or sign in with Google/GitHub
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Add Content
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start building your collection by adding your favorite movies
                  and shows
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Enjoy
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Search, filter, and manage your digital entertainment vault
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-pink-600/10 dark:from-cyan-600/5 dark:via-purple-600/5 dark:to-pink-600/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Enter the{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Future
                </span>
                ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Join thousands of users who have already transformed their
                entertainment experience with CyberLib.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/25 transition-all duration-300 group px-8 py-6 text-lg"
                >
                  <Link href="/auth/signup">
                    <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-black/50 backdrop-blur-sm py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Film className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                    CyberLib
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Your personal digital entertainment vault in the neon-lit
                  future.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Product
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      href="#features"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/signup"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Support
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      href="mailto:ealmonzer667@gmail.com"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:ealmonzer667@gmail.com"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Connect
                </h4>
                <div className="flex gap-4">
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-gray-300 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 bg-transparent"
                  >
                    <Link href="https://github.com/AlMonther9">
                      <Github className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-gray-300 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 bg-transparent"
                  >
                    <Link href="mailto:ealmonzer667@gmail.com">
                      <Mail className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                © 2024 CyberLib. All rights reserved. Built with ❤️ and ⚡ for
                the future.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
