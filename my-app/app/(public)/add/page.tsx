"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  User,
  Mail,
  Lock,
  Phone,
  CheckCircle,
  ArrowLeft,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  role: z.string(),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpTab() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
  });

  // Show loading state
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Check if user is owner
  if (!session?.user || session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-400">Only owners can add drivers.</p>
          <Link href="/dashboard" className="text-amber-500 mt-4 inline-block">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  async function handleSignUp(data: SignUpForm) {
    try {
      const { data: newUser, error } = await authClient.admin.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        data: {
          phone: data.phone,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Driver created successfully!");

      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error creating driver:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <>
      <div
        className=" flex items-center gap-2 ml-3 mt-5 cursor-pointer hover:text-amber-500 transition-all"
        onClick={() => router.back()}
      >
        <ArrowLeft size={20} />
        <span>back</span>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <CheckCircle className="size-10 text-amber-500" />
        <p className="py-3 text-2xl font-semibold text-white">Add a driver</p>
        <Card className="sm:min-w-96 w-full max-w-md p-3 sm:p-6 bg-black border border-amber-500/30 shadow-xl shadow-amber-500/5">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSignUp)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-amber-500 items-center mb-1">
                      <User className="h-4 w-4" />
                      <FormLabel className="text-white">Name</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the name"
                        className="bg-white/5 border-amber-500/30 text-white placeholder:text-white/40 focus:border-amber-500 focus:ring-amber-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-amber-500 items-center mb-1">
                      <Mail className="h-4 w-4" />
                      <FormLabel className="text-white">Email</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="user@example.com"
                        className="bg-white/5 border-amber-500/30 text-white placeholder:text-white/40 focus:border-amber-500 focus:ring-amber-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-amber-500 items-center mb-1">
                      <Phone className="h-4 w-4" />
                      <FormLabel className="text-white">Phone Number</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="+1 234 567 8900"
                        className="bg-white/5 border-amber-500/30 text-white placeholder:text-white/40 focus:border-amber-500 focus:ring-amber-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-amber-500 items-center mb-1">
                      <Users className="h-4 w-4" />
                      <FormLabel className="text-white">Roles</FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-white/5 border-amber-500/30 text-white">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="kitchen">Kitchen</SelectItem>

                          <SelectItem value="driver">Driver</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 text-amber-500 items-center mb-1">
                      <Lock className="h-4 w-4" />
                      <FormLabel className="text-white">Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="••••••"
                        className="bg-white/5 border-amber-500/30 text-white placeholder:text-white/40 focus:border-amber-500 focus:ring-amber-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full backdrop-blur-lg bg-amber-500 border border-white/40 rounded-xl text-black font-semibold transition-all duration-300 hover:scale-[1.02]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating Staff..."
                  : "Add Staff"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-white/60">
            <Link
              href="/dashboard/users"
              className="text-amber-500 hover:text-amber-400 hover:underline font-medium transition-colors"
            >
              Back to Users
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
