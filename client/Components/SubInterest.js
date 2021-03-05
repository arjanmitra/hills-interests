import React from 'react';
import { motion } from 'framer-motion';

export default function SubInterest(props) {
  const { subInterest } = props;
  return (
    <motion.div id="subinterest" animate={{ scale: [0, 1] }}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {' '}
        {subInterest.link ? (
          <a href={subInterest.link} target={'_blank'}>
            <h1>{subInterest.name}</h1>
          </a>
        ) : (
          <h1>{subInterest.name}</h1>
        )}
        <p>{subInterest.description}</p>
      </motion.div>
    </motion.div>
  );
}
