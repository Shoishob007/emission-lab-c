import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import AuthProvider from "./providers/AuthProvider";
import FooterSection from "@/components/FooterSection";
import FacebookHashFixer from "@/utils/FacebookHashFixer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.aiemissionlab.com"),
  title: "Carbon Initiative | Empowering Carbon Reduction",
  description:
    "Emission Lab is building a platform to help individuals and organizations calculate, reduce, and offset their carbon footprint.",
  icons: {
    icon: "/carbon-Fav.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Carbon Initiative | Empowering Carbon Reduction",
    description:
      "Emission Lab is building a platform to help individuals and organizations calculate, reduce, and offset their carbon footprint.",
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
      <head>
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/dmazsiqdy/video/upload/f_webm,vc_vp9,q_auto:eco,br_1600k,w_1920,h_1080,c_fill,ac_none/emisison-lab/video-1-compressed_dimlm8"
          fetchPriority="high"
        />
      </head>

      <body className={`${inter.className} bg-background`}>
        <AuthProvider>
          <FacebookHashFixer />
          <ConditionalNavbar />
          <main>{children}</main>
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  );
}
