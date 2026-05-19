"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Lock, Mail, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const SignInPage = () => {
  const router = useRouter();
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      await authClient.signIn.email(
        { ...data, callbackURL: "/" },
        {
          onError: (error) => {
            toast.error(error.error.message || "Failed to sign up");
          },
          onSuccess: () => {
            toast.success("User signed In successfully!");
            router.push("/");
            router.refresh();
          },
        },
      );
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-100 h-100 bg-amber-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-amber-600 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative w-full max-w-md p-6 sm:p-8">
        <div className="border backdrop-blur-xl shadow rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-300 hover:text-gray-500 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-100">Welcome Back</h1>
          </div>

          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSignUp)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-gray-400 items-center mb-1">
                      <Mail className="h-4 w-4" />
                      <FormLabel className="text-gray-400 font-medium">
                        Email
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="you@example.com"
                        className="focus:ring-amber-500 focus:border-amber-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-gray-400 items-center mb-1">
                      <Lock className="h-4 w-4" />
                      <FormLabel className="text-gray-400 font-medium">
                        Password
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Choose a strong password"
                        className="focus:ring-amber-500 focus:border-amber-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 transition-colors"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Create an account.
                <Link
                  href="/auth/sign-up"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
