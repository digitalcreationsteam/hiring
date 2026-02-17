// "use client";

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FeatherCheckCircle, FeatherArrowRight } from "@subframe/core";
// import { colors } from "src/common/Colors";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "../ui/components/Footer";

// // ============================================
// // BACKGROUND GLASS
// // ============================================
// const BackgroundGlass = () => (
//   <div className="fixed inset-0 pointer-events-none">
//     <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
//     <div className="absolute inset-0 bg-white/20 backdrop-blur-[150px]" />
//   </div>
// );

// // ============================================
// // SUCCESS ILLUSTRATION
// // ============================================
// const SuccessIllustration = () => (
//   <motion.div
//     initial={{ scale: 0 }}
//     animate={{ scale: 1 }}
//     transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
//     className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
//   >
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ delay: 0.3, duration: 0.3 }}
//     >
//       <FeatherCheckCircle className="w-16 h-16 text-green-500" />
//     </motion.div>
//   </motion.div>
// );

// export default function EmailVerifiedSuccess() {
//   const navigate = useNavigate();

//   // Auto redirect after 5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/talent-ranking", { replace: true });
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <>
//       <Navbar />
//       <BackgroundGlass />

//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-md w-full"
//         >
//           <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
//             <SuccessIllustration />

//             <h1
//               className="text-3xl font-light mb-2"
//               style={{ color: colors.accent }}
//             >
//               Email Verified!
//             </h1>

//             <p className="text-gray-500 mb-8">
//               Your email address has been successfully verified. You can now
//               access all features of UniTalent.
//             </p>

//             <div className="space-y-4">
//               <button
//                 onClick={() => navigate("/talent-ranking", { replace: true })}
//                 className="w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
//                 style={{ backgroundColor: colors.primary }}
//               >
//                 Continue to Dashboard
//                 <FeatherArrowRight className="w-4 h-4" />
//               </button>

//               <p className="text-sm text-gray-400">
//                 Redirecting in 5 seconds...
//               </p>
//             </div>

//             {/* Decorative elements */}
//             <div className="mt-8 pt-6 border-t border-gray-100">
//               <p className="text-xs text-gray-400">
//                 You can now start building your profile and discover
//                 opportunities.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// EmailVerifiedSuccess.tsx (same as previous)
// EmailVerifiedSuccess.tsx (same as previous)
"use client";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FeatherCheckCircle, FeatherArrowRight } from "@subframe/core";
import { colors } from "src/common/Colors";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";

const BackgroundGlass = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
    <div className="absolute inset-0 bg-white/20 backdrop-blur-[150px]" />
  </div>
);

const SuccessIllustration = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
    className="w-32 h-32 rounded-full bg-green-50 flex items-center mx-auto mb-6"
    style={{ justifyContent: "center" }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <FeatherCheckCircle
        className="w-16 h-16 text-green-500"
        style={{ justifyContent: "center" }}
      />
    </motion.div>
  </motion.div>
);

export default function EmailVerifiedSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/talent-ranking", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <BackgroundGlass />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <SuccessIllustration />

            <h1
              className="text-3xl font-light mb-2"
              style={{ color: colors.accent }}
            >
              Email Verified!
            </h1>

            <p className="text-gray-500 mb-8">
              Your email address has been successfully verified. You can now
              access all features of UniTalent.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/talent-ranking", { replace: true })}
                className="w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Continue to Talent Ranking
                <FeatherArrowRight className="w-4 h-4" />
              </button>

              <p className="text-sm text-gray-400">
                Redirecting in 5 seconds...
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                You can now start building your profile and discover
                opportunities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
