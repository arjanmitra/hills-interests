import React from 'react';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

export default function Back(props) {
  const { backButtonFunc } = props;
  return (
    <motion.h2
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => backButtonFunc()}
    >
      <Emoji text=":back:" />
    </motion.h2>
  );
}
