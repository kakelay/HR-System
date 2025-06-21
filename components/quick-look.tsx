import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building,
  MapPin,
  Briefcase,
  Users,
  FileText,
  UserPlus,
  BadgeCheck,
} from "lucide-react";

const stats = [
  {
    icon: Building,
    label: "Founded",
    value: "2003",
    color: "text-red-500",
  },
  {
    icon: MapPin,
    label: "Area served",
    value: "Nationwide",
    color: "text-orange-500",
  },
  {
    icon: Briefcase,
    label: "Industry",
    value: "Finance, Banking",
    color: "text-blue-500",
  },
  {
    icon: Users,
    label: "Employees",
    value: "3,600",
    color: "text-green-500",
  },
];

export function QuickLook() {
  return (
    <div className="space-y-6">
      {/* Organization Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Look</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">There are no items to show in this view.</p>
        </CardContent>
      </Card>

      {/* Trainings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Trainings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-600 text-white p-2 rounded text-center min-w-[60px]">
                <div className="text-lg font-bold">04</div>
                <div className="text-xs">Aug</div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Leadership and Management for New Manager</h4>
                <p className="text-xs text-gray-500">Training Center 5th Floor</p>
              </div>
            </div>
          </div>
          <Button variant="link" className="p-0 h-auto text-purple-600 mt-4">
            View All
          </Button>
        </CardContent>
      </Card>

      {/* HR System Overview */}
      <Card>
        <CardHeader>
          <CardTitle>HR System Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-100 text-indigo-500">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">12</div>
              <div className="text-sm text-gray-500">Leave Requests</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-100 text-emerald-500">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">3</div>
              <div className="text-sm text-gray-500">Job Openings</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-100 text-pink-500">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">5</div>
              <div className="text-sm text-gray-500">New Joiners</div>
            </div>
          </div>
          <Button variant="link" className="p-0 h-auto text-indigo-600 mt-4">
            Go to HR Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
