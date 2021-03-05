import React from 'react';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

export default function Category(props) {
  const { category, getResultInterests } = props;
  return (
    <motion.div id="category" animate={{ scale: [0, 1] }}>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        key={category.id}
        onClick={() => getResultInterests(category.name)}
      >
        <Emoji text={category.name} />
      </motion.h1>
      <p>
        <Emoji text={category.description} />
      </p>
    </motion.div>
  );
}
