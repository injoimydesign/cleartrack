import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "ClearTrack — Admin",
  description: "Song rights catalog for music clearance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-console-bg text-console-text font-sans">
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "var(--console-panel)",
              border: "1px solid var(--console-border)",
              color: "var(--console-text)",
            },
          }}
        />
      </body>
    </html>
  );
}
