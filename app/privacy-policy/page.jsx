// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// export default function PrivacyPolicy() {
//   return (
//     <section
//       className="relative py-20 flex justify-center items-center min-h-screen overflow-x-hidden"
//       style={{
//         backgroundImage: "url('/bg-calc.png')",
//         backgroundRepeat: "repeat",
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div
//         className="absolute inset-0"
//         style={{
//           pointerEvents: "none",
//           background:
//             "linear-gradient(to top right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,0.85) 80%)",
//         }}
//       />

//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
//       >
//         <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
//             Privacy Policy
//           </h1>
          
//           <div className="prose max-w-none">
//             <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
//             <p>
//               When you use our carbon calculator, we may collect information you voluntarily provide, including:
//             </p>
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Travel details (flight routes, distances, etc.)</li>
//               <li>Transportation information (vehicle type, fuel usage)</li>
//               <li>Accommodation details</li>
//               <li>Basic usage statistics</li>
//             </ul>

//             <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
//             <p>
//               The information you provide is used solely for the purpose of calculating your carbon footprint estimate. We do not sell or share your personal data with third parties for marketing purposes.
//             </p>

//             <h2 className="text-xl font-semibold mt-6">3. Data Storage</h2>
//             <p>
//               Calculation data is stored temporarily to provide your results. We do not permanently store your personal travel information unless you create an account and explicitly opt to save your calculations.
//             </p>

//             <h2 className="text-xl font-semibold mt-6">4. Cookies and Tracking</h2>
//             <p>
//               We may use cookies to improve your experience on our site. These cookies do not contain personally identifiable information.
//             </p>

//             <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
//             <p>
//               You have the right to request access to, correction of, or deletion of any personal data we may hold about you.
//             </p>

//             <div className="mt-12 text-sm text-gray-500">
//               <p>Last updated: {new Date().toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import ComingSoon from "../../components/coming-soon";

export default function PrivacyPolicy() {
  return (
    <>
    <ComingSoon text="Coming Soon" subtext={
        <>
          Please check back soon for updates! <br />
          For more info, email us at <br />
          <span className="font-semibold">info@aiemissionlab.om</span>
        </>
      }  />
    </>
  );
}