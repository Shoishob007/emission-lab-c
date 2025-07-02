import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import AuthProvider from "./providers/AuthProvider";
import FooterSection from "@/components/FooterSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Emission Lab",
  description: "Calculate your carbon emissions",
  icons: {
    icon: "/carbon-Fav.png",
    apple: "/apple-touch-icon.png",
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
