"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
    title: "Request & Report",
    items: ["Submit Request", "View Reports", "Status Tracking"],
  },
  {
    title: "HR & Learning",
    items: ["Training Programs", "Employee Resources", "Performance"],
  },
  {
    title: "User Guide",
    items: ["System Guides", "Tutorials", "FAQ"],
  },
  {
    title: "Document/Forms",
    items: ["Application Forms", "Templates", "Documents"],
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

export function DesktopNavigation() {
  return (
    <div className="bg-[#a53c6f] shadow-sm border-b sticky top-14 sm:top-16 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex-wrap gap-0.5 py-1">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {/* Trigger Button */}
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-[#8e2e5e] text-xs px-2 py-1 font-medium h-auto">
                  {item.title}
                </NavigationMenuTrigger>

                {/* Dropdown Content */}
                <NavigationMenuContent>
                  <div className="flex flex-col w-48 p-3 bg-white border border-gray-200 rounded shadow-md">
                    {/* Section Title */}
                    <div className="text-sm font-semibold text-[#a53c6f] mb-2">
                      {item.title}
                    </div>

                    {/* Sub-items List */}
                    {item.items.map((subItem) => (
                      <div
                        key={subItem}
                        className="text-xs text-gray-800 hover:bg-[#fbe9f1] hover:text-[#a53c6f] px-2 py-1 rounded cursor-pointer"
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
