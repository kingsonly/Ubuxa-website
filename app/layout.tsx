import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ubuxa - Energy Management SaaS Platform",
  description:
    "All-in-one platform for managing inverters, batteries, and energy products. Streamline sales, track inventory, manage customers, and generate device tokens with our powerful SaaS solution.",
  icons: {
    icon: [

      { url: '/images/logo-icon.png', type: 'image/png' }, // Additional icon
    ],
    apple: [
      { url: '/images/logo-icon.png', type: 'image/png' }, // Additional icon
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
//           {children}
//         {/* </body></ThemeProvider> */}
//       </body>
//     </html>
//   );
// }