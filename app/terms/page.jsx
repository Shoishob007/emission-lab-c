// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// export default function TermsAndConditions() {
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
//             Terms & Conditions
//           </h1>
          
//           <div className="prose max-w-none">
//             <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
//             <p>
//               Welcome to our Carbon Calculator service. These terms and conditions outline the rules and regulations for the use of our carbon footprint calculation services.
//             </p>

//             <h2 className="text-xl font-semibold mt-6">2. Service Description</h2>
//             <p>
//               Our carbon calculator provides estimates of carbon emissions based on user-provided information about travel, transportation, and accommodation. These are estimates only and should not be considered exact measurements.
//             </p>

//             <h2 className="text-xl font-semibold mt-6">3. User Responsibilities</h2>
//             <ul className="list-disc pl-6 space-y-2">
//               <li>You must provide accurate information to the best of your knowledge</li>
//               <li>You agree not to misuse the service or attempt to manipulate results</li>
//               <li>You understand these are estimates only</li>
//             </ul>

//             <h2 className="text-xl font-semibold mt-6">4. Limitation of Liability</h2>
//             <p>
//               We shall not be liable for any decisions made based on the information provided by this calculator. The service is provided &quot;as is&quot; without warranty of any kind.
//             </p>

//             <h2 className="text-xl font-semibold mt-6">5. Changes to Terms</h2>
//             <p>
//               We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of the modified terms.
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

export default function Terms() {
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