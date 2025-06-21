"use client";
import { Building2, Shield, Users, TrendingUp } from "lucide-react";
import { SignInForm } from "./sign-in-form";

export function SignInLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center space-y-8">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold">AMK</h1>
              <p className="text-xl text-white/90">
                Microfinance Institution Plc
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 rounded-full p-3">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Secure Banking</h3>
                  <p className="text-white/80 text-sm">
                    Your data is protected with enterprise-grade security
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/10 rounded-full p-3">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Trusted by Thousands</h3>
                  <p className="text-white/80 text-sm">
                    Serving communities across the nation
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/10 rounded-full p-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Growing Together</h3>
                  <p className="text-white/80 text-sm">
                    Empowering financial growth since 2003
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
