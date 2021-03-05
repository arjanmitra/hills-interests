import React from 'react';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

export default function Interest(props) {
  const { interest, getResultSubInterests } = props;
  return (
    <motion.div
      id="interest"
      animate={{ scale: [0, 1] }}
      onClick={() => getResultSubInterests(interest.name)}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {interest.link ? (
          <a href={interest.link}>
            <h1>
              <Emoji text={interest.name} />
            </h1>
          </a>
        ) : (
          <h1>
            <Emoji text={interest.name} />
          </h1>
        )}
        <p>{interest.description}</p>
      </motion.div>
    </motion.div>
  );
}
