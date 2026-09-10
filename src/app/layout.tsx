import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ClearTrack — Admin",
  description: "Song rights catalog for music clearance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
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
