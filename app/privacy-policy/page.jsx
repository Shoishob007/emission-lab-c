"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  UserCheck,
  Eye,
  Lock,
  Mail,
  Globe,
  Cookie,
  Trash2,
  Info,
  RefreshCw,
  Archive,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section
      className="relative py-20 flex justify-center items-center min-h-screen overflow-x-hidden bg-white"
      style={{
        backgroundImage: "url('/bg-calc.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(to top right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,0.85) 80%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 py-4"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#eaeaea]">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <span className="inline-flex items-center justify-center rounded-full bg-[#F7F7F7] p-3 mb-2 shadow-inner border border-[#eaeaea]">
              <ShieldCheck size={28} strokeWidth={2} className="text-primary" />
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
              Privacy Policy
            </h1>
            <p className="text-[#767676] text-center text-base md:text-lg max-w-2xl">
              Your privacy is important to us. This policy explains what
              information we collect, how we use it, and your rights as a user
              of aiemissionlab.com.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-8">
            {/* 1. Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Information We Collect
                </span>
              </div>
              <p className="text-[#767676] mb-2">
                When you use our carbon calculator, we may collect information
                you voluntarily provide, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-[#767676]">
                <li>Travel details (flight routes, distances, etc.)</li>
                <li>Transportation information (vehicle type, fuel usage)</li>
                <li>Accommodation details</li>
                <li>Basic usage statistics</li>
              </ul>
            </div>

            {/* 2. How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  How We Use Your Information
                </span>
              </div>
              <p className="text-[#767676]">
                The information you provide is used solely for the purpose of
                calculating your carbon footprint estimate. We do not sell or
                share your personal data with third parties for marketing
                purposes.
              </p>
            </div>

            {/* 3. Data Storage */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Archive className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Data Storage
                </span>
              </div>
              <p className="text-[#767676]">
                Calculation data is stored temporarily to provide your results.
                We do not permanently store your personal travel information
                unless you create an account and explicitly opt to save your
                calculations.
              </p>
            </div>

            {/* 4. Cookies and Tracking */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Cookie className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Cookies and Tracking
                </span>
              </div>
              <p className="text-[#767676]">
                We may use cookies to improve your experience on our site. These
                cookies do not contain personally identifiable information. You
                can control cookie preferences through your browser settings.
              </p>
            </div>

            {/* 5. Your Rights */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Your Rights
                </span>
              </div>
              <p className="text-[#767676]">
                You have the right to request access to, correction of, or
                deletion of any personal data we may hold about you. Please
                contact us via email if you wish to exercise your rights under
                applicable data protection laws.
              </p>
            </div>

            {/* 6. Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Data Security
                </span>
              </div>
              <p className="text-[#767676]">
                We take reasonable steps to protect your information against
                unauthorized access, disclosure, or destruction. However, no
                online system can be guaranteed 100% secure.
              </p>
            </div>

            {/* 7. International Users */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  International Users
                </span>
              </div>
              <p className="text-[#767676]">
                If you are accessing our site from outside our primary country
                of operations, your information may be transferred and processed
                in countries with different data protection laws.
              </p>
            </div>

            {/* 8. Changes to this Policy */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <RefreshCw className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Changes to this Policy
                </span>
              </div>
              <p className="text-[#767676]">
                We may update this privacy policy at any time. Changes will be
                posted on this page. Your continued use of our site constitutes
                acceptance of the revised policy.
              </p>
            </div>

            {/* 9. Contact Information */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Contact Information
                </span>
              </div>
              <p className="text-[#767676]">
                If you have any questions or concerns about this Privacy Policy
                or your data, please contact us at:
                <br />
                <span className="font-semibold text-primary">Email:</span>{" "}
                <a href="mailto:info@aiemissionlab.com" className="underline">
                  info@aiemissionlab.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-12 text-sm text-gray-500 text-center">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// import ComingSoon from "../../components/coming-soon";

// export default function PrivacyPolicy() {
//   return (
//     <>
//     <ComingSoon text="Coming Soon" subtext={
//         <>
//           Please check back soon for updates! <br />
//           For more info, email us at <br />
//           <span className="font-semibold">info@aiemissionlab.om</span>
//         </>
//       }  />
//     </>
//   );
// }
