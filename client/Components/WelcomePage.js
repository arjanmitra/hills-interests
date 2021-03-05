import React from 'react';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

export default function WelcomePage(props) {
  const { welcomePageState } = props;
  return (
    <motion.div
      id="welcome"
      animate={{ scale: [0, 1.5, 1] }}
      transition={{ duration: 1 }}
      onClick={() => welcomePageState()}
    >
      <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
        <Emoji text=":crown::zap:" />
      </motion.div>
    </motion.div>
  );
}
