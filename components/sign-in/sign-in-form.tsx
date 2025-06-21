"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Lock, Building2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

// Static credentials for demo
const VALID_CREDENTIALS = {
  username: "admin",
  password: "password123",
}

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" })
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const router = useRouter()

  // Check if user is already logged in and redirect
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      router.replace("/") // Use replace instead of push to prevent back navigation
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: null, text: "" })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check credentials
    if (formData.username === VALID_CREDENTIALS.username && formData.password === VALID_CREDENTIALS.password) {
      setMessage({ type: "success", text: "Login successful! Redirecting to dashboard..." })

      // Store login state and user data
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: formData.username,
          email: "admin@nato.com",
          loginTime: new Date().toISOString(),
        }),
      )

      // Redirect to dashboard after success message using replace to prevent back navigation
      setTimeout(() => {
        router.replace("/")
      }, 2000)
    } else {
      setMessage({ type: "error", text: "Invalid username or password. Please try again." })
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear message when user starts typing
    if (message.type) {
      setMessage({ type: null, text: "" })
    }
  }

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
          <h1 className="text-3xl font-bold text-white mb-2">NATO</h1>
          <p className="text-white/80 text-sm">NATO Microfinance Institution Plc</p>
        </div>

        {/* Sign In Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Info */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-blue-700">
                Username: <span className="font-mono">admin</span>
              </p>
              <p className="text-xs text-blue-700">
                Password: <span className="font-mono">password123</span>
              </p>
            </div>

            {/* Success/Error Message */}
            {message.type && (
              <Alert
                className={`mb-4 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <div className="flex items-center">
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mr-2" />
                  )}
                  <AlertDescription
                    className={`text-sm ${message.type === "success" ? "text-green-800" : "text-red-800"}`}
                  >
                    {message.text}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="text-sm text-purple-600 hover:text-purple-800 p-0 h-auto">
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Button variant="link" className="text-purple-600 hover:text-purple-800 p-0 h-auto text-sm">
                  Contact Support
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-xs">© 2024 NATO Microfinance Institution Plc. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
