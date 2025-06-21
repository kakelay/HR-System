"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface IdleWarningModalProps {
  isOpen: boolean
  onStayLoggedIn: () => void
  onLogout: () => void
  warningTime?: number // in seconds
}

export function IdleWarningModal({
  isOpen,
  onStayLoggedIn,
  onLogout,
  warningTime = 60, // 2 minutes default
}: IdleWarningModalProps) {
  const [timeLeft, setTimeLeft] = useState(warningTime)

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(warningTime)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onLogout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, warningTime, onLogout])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <DialogTitle className="text-lg font-semibold">Session Timeout Warning</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Your session will expire due to inactivity. You will be automatically logged out in:
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="flex items-center space-x-2 text-2xl font-bold text-red-600">
            <Clock className="h-6 w-6" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Click "Stay Logged In" to continue your session, or you will be automatically signed out.
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onLogout} className="flex-1">
            Sign Out Now
          </Button>
          <Button
            onClick={onStayLoggedIn}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Stay Logged In
          </Button>
        </div>

        {/* Custom styles to hide the close button */}
        <style jsx>{`
          :global([data-radix-dialog-content] button[aria-label="Close"]) {
            display: none !important;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}
