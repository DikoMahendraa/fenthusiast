"use client"

import { motion } from "framer-motion"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.path
          d="M8 8h16M8 16h12M8 24h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="sketch-animate"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="sketch-animate"
        />
      </motion.svg>
      <span className="font-bold text-xl text-primary font-space-grotesk">FEnthusiast</span>
    </motion.div>
  )
}
