import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { IdleTimerProvider } from "@/components/idle-warning-modal/idle-timer-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NATO Microfinance Institution",
  description: "NATO Microfinance Institution Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <IdleTimerProvider>{children}</IdleTimerProvider>
      </body>
    </html>
  )
}
