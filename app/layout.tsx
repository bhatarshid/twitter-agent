import type { Metadata } from "next";
import { ThemeProvider } from '@/components/theme-provider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Twitter Agent",
  description: "A platform for Twitter automation"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
