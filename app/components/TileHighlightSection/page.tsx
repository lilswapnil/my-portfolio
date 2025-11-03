'use client';

import { motion } from 'framer-motion';
import { tilesData } from '../../../data/tile-highlights';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};



export default function TileHighlightSection() {
  return (
    <motion.div
      className='tile-highlights min-h-[50vh] w-full flex items-center justify-center p-8'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
        {tilesData.map((tile) => (
          <motion.div
            key={tile.id}
            className="glass-tile h-48 rounded-2xl gap-4 p-6 flex flex-col text-center justify-center"
            variants={tileVariants}
          >
            <h3 className="text-4xl font-bold text-white">{tile.title}</h3>
            <p className="text-sm text-gray-200">{tile.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}