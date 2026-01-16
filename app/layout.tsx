import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import { cn } from "@/lib/utils";
import ToastProvider from "@/providers/ToastProvider";

const noto_Sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-Sans",
});

export const metadata: Metadata = {
  title: "Umer poultry service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ToastProvider />
        <body className={cn("w-full h-full font-noto_sans antialiased bg-slate-100",noto_Sans.variable)}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
