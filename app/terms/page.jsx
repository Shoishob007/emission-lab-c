"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Info,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Globe,
  RefreshCw,
  Mail,
  Lock,
  Cookie,
  Copyright,
  Landmark,
  BadgeCheck,
} from "lucide-react";

export default function TermsAndConditions() {
  return (
    <section
      className="relative py-20 flex justify-center items-center min-h-screen overflow-x-hidden bg-white"
      style={{
        backgroundImage: "url('/bg_1.jpg')",
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
            <span className="inline-flex items-center bg-primary/20 justify-center rounded-full bg-[#F7F7F7] p-3 mb-2 shadow-inner border border-[#eaeaea]">
              <FileText size={28} strokeWidth={2} className="text-primary" />
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
              Terms & Conditions
            </h1>
            <p className="text-[#767676] text-center text-base md:text-lg max-w-2xl">
              Please read these terms carefully. By using our services, you
              agree to the following.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-8">
            {/* Introduction */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Introduction
                </span>
              </div>
              <p className="text-[#767676]">
                Welcome to{" "}
                <span className="font-semibold">aiemissionlab.com</span>. By
                accessing or using our website, you agree to comply with these
                terms and conditions. These terms apply to all visitors, users,
                and others who access or use the site. Please read them
                carefully.
              </p>
            </div>

            {/* Disclaimer */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Disclaimer
                </span>
              </div>
              <p className="text-[#767676] mb-2">
                <span className="font-semibold">aiemissionlab.com</span> is
                provided on an &quot;as is&quot; and &quot;as available&quot;
                basis. While Emission Lab has taken reasonable care to ensure
                the accuracy of information presented, we provide it for
                informational and guidance purposes only. Emission Lab is not
                liable for any incorrect or misrepresented information on the
                site.
              </p>
              <p className="text-[#767676] mb-2">
                Emission Lab makes no representations or warranties of any kind,
                express or implied, regarding the site&apos;s operation,
                information, content, materials, or products included on this
                website. To the fullest extent permissible by applicable law,
                Emission Lab disclaims all warranties, express or implied,
                including but not limited to implied warranties of
                merchantability and fitness for a particular purpose.
              </p>
              <p className="text-[#767676]">
                Emission Lab will not be liable for any damages of any kind
                arising from the use of this site, including but not limited to
                direct, indirect, incidental, punitive, or consequential
                damages.
              </p>
            </div>

            {/* Copyright and Intellectual Property */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Copyright className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Copyright and Intellectual Property
                </span>
              </div>
              <p className="text-[#767676]">
                All content on{" "}
                <span className="font-semibold">aiemissionlab.com</span>,
                including text, graphics, logos, and software, is the property
                of Emission Lab or its content suppliers and protected by
                international copyright laws. Unauthorized use, reproduction,
                modification, distribution, or display of the content is
                prohibited.
              </p>
            </div>

            {/* Trademarks */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Landmark className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Trademarks
                </span>
              </div>
              <p className="text-[#767676]">
                Any trademarks not owned by Emission Lab, but appearing on this
                site, are the property of their respective owners. Unauthorized
                use of these trademarks is prohibited.
              </p>
            </div>

            {/* Applicable Law */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Applicable Law
                </span>
              </div>
              <p className="text-[#767676]">
                These terms and conditions are governed by the laws applicable
                in the jurisdiction of Emission Lab’s operations. Users agree
                that any legal action related to this site shall be governed by
                these laws without regard to principles of conflicts of law.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <RefreshCw className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Changes to Terms
                </span>
              </div>
              <p className="text-[#767676]">
                Emission Lab reserves the right to update or modify these terms
                and conditions at any time. Changes will be posted on this page,
                and continued use of the site signifies acceptance of revised
                terms.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6 text-secondary" />
                <span className="font-semibold text-lg text-[#163820]">
                  Contact Information
                </span>
              </div>
              <p className="text-[#767676]">
                For questions or concerns regarding these terms and conditions
                or our privacy practices, please contact us at:
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
