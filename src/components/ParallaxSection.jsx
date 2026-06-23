import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxSection component
 * Maps page scroll to translation values on the GPU using Framer Motion.
 * Resolves jittering/lag issues seen with standard scroll listeners.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to move
 * @param {number} props.speed - Parallax intensity (0.1 = slow, 0.5 = fast, negative = moves up)
 * @param {string} props.className - Tailwind classes
 * @param {Object} props.style - Additional inline styles
 */
export default function ParallaxSection({ children, speed = 0.2, className = "", style = {} }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Transform scroll offset to translate coordinate
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div 
      ref={ref}
      className={className} 
      style={{ 
        ...style, 
        y
      }}
    >
      {children}
    </motion.div>
  );
}
