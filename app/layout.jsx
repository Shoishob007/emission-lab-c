import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import AuthProvider from "./providers/AuthProvider";
import FooterSection from "@/components/FooterSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.aiemissionlab.com"),
  title: "Carbon Initiative | Empowering Carbon Reduction",
  description:
    "AI Emission Lab is building a platform to help individuals and organizations calculate, reduce, and offset their carbon footprint.",
  openGraph: {
    title: "Carbon Initiative | Empowering Carbon Reduction",
    description:
      "AI Emission Lab is building a platform to help individuals and organizations calculate, reduce, and offset their carbon footprint.",
    url: "https://www.aiemissionlab.com",
    siteName: "AI Emission Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbon Initiative | Empowering Carbon Reduction",
    description:
      "Join us on the mission to tackle climate change with AI-driven carbon solutions.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <AuthProvider>
          <ConditionalNavbar />
          <main>{children}</main>
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  );
}
