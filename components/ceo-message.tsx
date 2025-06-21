import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CEOMessage() {
  return (
    <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">CEO Message</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="text-lg mb-4">Hear the messages from your CEO for this month</p>
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              View All
            </Button>
          </div>
          <div className="flex-shrink-0">
            <div className="w-48 h-32 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">📢</span>
                </div>
                <p className="text-sm">CEO Announcement</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
