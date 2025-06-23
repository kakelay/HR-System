"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

// Updated user database with your provided data
const users = [
  {
    id: 1,
    username: "Elay.Kak",
    password: "password123",
    email: "elay.kak@gmail.com",
    phone: "+85512345678",
    role: "superAdmin",
    image: "https://avatars.githubusercontent.com/u/110383694?v=4",
  },
  {
    id: 2,
    username: "John.Doe",
    password: "password123",
    email: "john.doe@gmail.com",
    phone: "+85598765432",
    role: "user",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    username: "Jane.Smith",
    password: "password123",
    email: "jane.smith@gmail.com",
    phone: "+85511223344",
    role: "user",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    username: "Tharin.Kruy",
    password: "password123",
    email: "tharin.smith@gmail.com",
    phone: "+85511223344",
    role: "admin",
    image: "https://avatars.githubusercontent.com/u/117300932?v=4",
  },
];

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter();

  // Check if user is already logged in and redirect
  useEffect(() => {
    const checkAuthStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        router.replace("/");
        return;
      }
      setIsCheckingAuth(false);
    };

    const timer = setTimeout(checkAuthStatus, 50);
    return () => clearTimeout(timer);
  }, [router]);

  // Show loading spinner while checking auth status
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: null, text: "" });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Find user by username and password
    const user = users.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );

    if (user) {
      const displayName = user.username.replace(".", " ");
      const roleText =
        user.role === "superAdmin"
          ? "Super Administrator"
          : user.role === "admin"
          ? "Administrator"
          : "User";
      setMessage({
        type: "success",
        text: `Welcome back, ${displayName}! (${roleText}) Redirecting to dashboard...`,
      });

      // Store login state and user data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.image,
          displayName: displayName,
          loginTime: new Date().toISOString(),
        })
      );

      // Redirect to dashboard after success message
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } else {
      setMessage({
        type: "error",
        text: "Invalid username or password. Please try again.",
      });
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear message when user starts typing
    if (message.type) {
      setMessage({ type: null, text: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">NETO</h1>
          <p className="text-white/80 text-sm">NETO Testing</p>
        </div>

        {/* Sign In Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Info */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-2">
                Demo Accounts:
              </p>
              <div className="space-y-1">
                <p className="text-xs text-blue-700">
                  <span className="font-mono">Elay.Kak</span> /{" "}
                  <span className="font-mono">password123</span> (Super Admin)
                </p>
                <p className="text-xs text-blue-700">
                  <span className="font-mono">Tharin.Kruy</span> /{" "}
                  <span className="font-mono">password123</span> (Admin)
                </p>
                <p className="text-xs text-blue-700">
                  <span className="font-mono">John.Doe</span> /{" "}
                  <span className="font-mono">password123</span> (User)
                </p>
                <p className="text-xs text-blue-700">
                  <span className="font-mono">Jane.Smith</span> /{" "}
                  <span className="font-mono">password123</span> (User)
                </p>
              </div>
            </div>

            {/* Success/Error Message */}
            {message.type && (
              <Alert
                className={`mb-4 ${
                  message.type === "success"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-center">
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mr-2" />
                  )}
                  <AlertDescription
                    className={`text-sm ${
                      message.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {message.text}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="text-sm text-purple-600 hover:text-purple-800 p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="relative">
                      <div className="w-4 h-4 border-2 border-white/30 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="animate-pulse">Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Button
                  variant="link"
                  className="text-purple-600 hover:text-purple-800 p-0 h-auto text-sm"
                >
                  Contact Support
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-xs">
            © 2024 NETO Testing All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
