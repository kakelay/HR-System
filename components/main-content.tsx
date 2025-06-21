import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const performanceData = [
  {
    description: "Net Profit",
    mar25: "$410,242",
    apr25: "$493,696",
    bp2025: "$2,420,107",
  },
  {
    description: "ROA",
    mar25: "0.22%",
    apr25: "0.21%",
    bp2025: "0.33%",
  },
  {
    description: "ROE",
    mar25: "1.20%",
    apr25: "1.10%",
    bp2025: "1.78%",
  },
];

export function MainContent() {
  return (
    <div className="space-y-6">
      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">
                អនុសាសន៍ ចំ រៀន ទេ ទូលបានការអនុវត្ត
              </h3>
              <p className="text-sm opacity-90">ប្រាក់ដុល</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 right-0 text-6xl opacity-20">
              🏆
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>អនុសាសន៍ ចំ រៀន ទេ ទូលបានការអនុវត្តនិងការអនុវត្ត...</p>
            <a href="#" className="text-blue-600 hover:underline">
              https://intranet.NATOcambodia.com
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Performance Highlights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-600">
              Performance Highlights
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-semibold text-purple-600">
              Achievement Summary 2025
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DESCRIPTIONS</TableHead>
                <TableHead>Mar/25(Unaudited)</TableHead>
                <TableHead>Apr/25(Unaudited)</TableHead>
                <TableHead>BP2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {row.description}
                  </TableCell>
                  <TableCell>{row.mar25}</TableCell>
                  <TableCell>{row.apr25}</TableCell>
                  <TableCell>{row.bp2025}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
