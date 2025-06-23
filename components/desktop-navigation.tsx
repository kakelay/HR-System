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
    <div className="bg-[#1F2937] shadow-sm border-b border-white/10 sticky top-14 sm:top-16 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex-wrap gap-0.5 py-1">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {/* Trigger Button */}
                <NavigationMenuTrigger className="bg-transparent text-white  text-xs px-2 py-1 font-medium h-auto">
                  {item.title}
                </NavigationMenuTrigger>

                {/* Dropdown Content */}
                <NavigationMenuContent>
                  <div className="flex flex-col w-48 p-3 bg-white border border-gray-200 rounded shadow-md">
                    {/* Section Title */}
                    <div className="text-sm font-semibold text-[#E11D48] mb-2">
                      {item.title}
                    </div>

                    {/* Sub-items List */}
                    {item.items.map((subItem) => (
                      <div
                        key={subItem}
                        className="text-xs text-gray-800 hover:bg-[#fdf2f8] hover:text-[#E11D48] px-2 py-1 rounded cursor-pointer transition-colors"
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
