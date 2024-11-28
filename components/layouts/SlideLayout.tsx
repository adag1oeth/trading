import { motion } from "framer-motion";
import React from "react";

interface SlideLayoutProps {
  title: string;
  slideNumber: number;
  children: React.ReactNode;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  title,
  slideNumber,
  children,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:p-8 p-2">
      <div className="relative mb-4 md:mb-12 bg-black/50 sticky top-0 z-10 pt-2">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold gradient-text">
            {title}
          </h2>
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="glass-card px-3 py-1 md:px-4 md:py-2 rounded-full border border-electric-purple/20">
            <span className="text-xs md:text-sm font-medium">
              <span className="text-white/40">Slide </span>
              <span className="gradient-text font-bold">{slideNumber}</span>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto touch-pan-y pb-20">{children}</div>
    </div>
  );
};
