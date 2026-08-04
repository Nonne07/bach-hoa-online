"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)", rotateX: 5 }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }}
      transition={{ 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className="flex-grow flex flex-col w-full min-h-screen relative z-10"
    >
      {children}
    </motion.div>
  );
}
