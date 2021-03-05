import React from 'react';
import { motion } from 'framer-motion';

export default function Title() {
  return <motion.h1 animate={{ scale: [0, 1] }}>Hill's Interests</motion.h1>;
}
