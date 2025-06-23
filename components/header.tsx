"use client";

import { useState, useEffect } from "react";
import {
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Settings,
  UserCircle,
  Shield,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    displayName: string;
  } | null>(null);

  // Check login status on component mount and listen for changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const userData = localStorage.getItem("userData");

      if (loginStatus === "true" && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (useful for auto-logout)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");

      // Update local state immediately
      setIsLoggedIn(false);
      setUser(null);

      // Close mobile menu if open
      setIsMobileMenuOpen(false);

      // Force a storage event to notify other components
      window.dispatchEvent(new Event("storage"));

      // Stay on current page - no redirect needed
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Get role icon and color
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "superAdmin":
        return {
          icon: Crown,
          color: "text-yellow-500",
          label: "Super Admin",
          bgColor: "bg-yellow-50",
        };
      case "admin":
        return {
          icon: Shield,
          color: "text-red-500",
          label: "Admin",
          bgColor: "bg-red-50",
        };
      default:
        return {
          icon: User,
          color: "text-blue-500",
          label: "User",
          bgColor: "bg-blue-50",
        };
    }
  };

  const navigationItems = [
    {
      title: "Policy and SOP",
      items: ["Policies", "Standard Operating Procedures", "Guidelines"],
    },
    {
      title: "Memo",
      items: ["Internal Memos", "Announcements", "Circulars"],
    },
    {
      title: "Product",
      items: ["Loan Products", "Savings", "Insurance"],
    },
    {
      title: "Core System",
      items: ["Banking System", "Reports", "Analytics"],
    },
    {
      title: "Internal System",
      items: ["HR System", "Finance System", "Operations"],
    },
    {
      title: "Panel Law Firm",
      items: ["Legal Services", "Contracts", "Compliance"],
    },
    {
      title: "Bulletin",
      items: ["News", "Updates", "Notifications"],
    },
  ];

  return (
    <header className="bg-[#1F2937] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0"
          >
            <div className="text-xl sm:text-2xl font-bold">NATO</div>
            <div className="hidden sm:block text-xs sm:text-sm">
              <div className="hidden lg:block">
                Nato Microfinance Institution Plc
              </div>
              <div className="lg:hidden">NATO Microfinance</div>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              {isSearchOpen ? (
                <Input
                  placeholder="Search..."
                  className="w-48 lg:w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70 text-sm"
                  onBlur={() => setIsSearchOpen(false)}
                  autoFocus
                />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              )}
            </div>

            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* User Profile or Sign In */}
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 h-8 sm:h-10 px-2 sm:px-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.displayName}
                          crossOrigin="anonymous"
                        />
                        <AvatarFallback className="bg-white/20 text-white text-xs">
                          {user.displayName
                            ? user.displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium">
                        {user.displayName}
                      </span>
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <div className="flex items-center mt-1">
                      {(() => {
                        const roleDisplay = getRoleDisplay(user.role);
                        const RoleIcon = roleDisplay.icon;
                        return (
                          <>
                            <RoleIcon
                              className={`h-3 w-3 ${roleDisplay.color} mr-1`}
                            />
                            <span className="text-xs font-medium text-gray-600">
                              {roleDisplay.label}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
                >
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Sign in</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile User Profile */}
                {isLoggedIn && user && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.displayName}
                          crossOrigin="anonymous"
                        />
                        <AvatarFallback className="bg-[#1F2937] text-white">
                          {user.displayName
                            ? user.displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.displayName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex items-center mt-1">
                          {(() => {
                            const roleDisplay = getRoleDisplay(user.role);
                            const RoleIcon = roleDisplay.icon;
                            return (
                              <>
                                <RoleIcon
                                  className={`h-3 w-3 ${roleDisplay.color} mr-1`}
                                />
                                <span className="text-xs font-medium text-gray-600">
                                  {roleDisplay.label}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <UserCircle className="mr-1 h-3 w-3" />
                        Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="mr-1 h-3 w-3" />
                        Sign out
                      </Button>
                    </div>
                  </div>
                )}

                {/* Show Sign In button in mobile menu when logged out */}
                {!isLoggedIn && (
                  <div className="mb-6">
                    <Link href="/sign-in">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <DropdownMenu key={item.title}>
                      <DropdownMenuTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-[#E11D48] text-[#1F2937] rounded-lg font-medium">
                        <span className="text-sm">{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {item.items.map((subItem) => (
                          <DropdownMenuItem
                            key={subItem}
                            className="text-sm hover:bg-[#E11D48] hover:text-[#1F2937]"
                          >
                            {subItem}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
