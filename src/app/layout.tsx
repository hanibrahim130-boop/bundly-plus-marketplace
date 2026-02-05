import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BundlyPlus - Premium Subscriptions for Lebanon | Netflix, Spotify & More",
  description: "Lebanon's trusted digital subscription marketplace. Get Netflix, Spotify, PlayStation Plus and more at competitive USD prices. Pay with Visa, OMT, or Whish Money. Instant delivery guaranteed.",
  keywords: ["Netflix Lebanon", "Spotify Lebanon", "digital subscriptions", "BundlyPlus", "OMT payment", "Whish Money", "streaming subscriptions"],
  openGraph: {
    title: "BundlyPlus - Premium Subscriptions for Lebanon",
    description: "Lebanon's trusted digital subscription marketplace. Netflix, Spotify, PlayStation Plus and more at competitive prices.",
    type: "website",
    locale: "en_US",
    siteName: "BundlyPlus",
  },
  twitter: {
    card: "summary_large_image",
    title: "BundlyPlus - Premium Subscriptions for Lebanon",
    description: "Lebanon's trusted digital subscription marketplace. Netflix, Spotify, PlayStation Plus and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
    <body
      className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
    >
      <AuthProvider>
        {children}
        <WhatsAppButton />
      </AuthProvider>
      <Toaster 

          position="top-right" 
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
