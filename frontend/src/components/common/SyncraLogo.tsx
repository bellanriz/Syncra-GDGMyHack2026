import React from 'react';
import { motion } from 'motion/react';
export const SyncraLogo = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
    initial="initial"
    animate="animate"
  >
    <motion.circle 
      cx="35" 
      cy="50" 
      r="30" 
      fill="currentColor"
      variants={{
        initial: { scale: 0.5, opacity: 0, x: -10 },
        animate: { 
          scale: 1, 
          opacity: 1, 
          x: 0,
          transition: { 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          } 
        }
      }}
    />
    <motion.path 
      d="M 68 20 A 30 30 0 0 1 68 80 Z" 
      fill="currentColor"
      variants={{
        initial: { x: 20, opacity: 0, scale: 0.8 },
        animate: { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          transition: { 
            delay: 0.2, 
            duration: 0.9, 
            type: "spring", 
            bounce: 0.4 
          } 
        }
      }}
    />
  </motion.svg>
);
