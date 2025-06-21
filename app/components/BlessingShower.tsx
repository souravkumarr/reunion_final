'use client';

import { motion } from 'framer-motion';

interface BlessingShowerProps {
  isActive: boolean;
}

export default function BlessingShower({ isActive }: BlessingShowerProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 max-w-md mx-4 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Blessings & Wishes</h2>
        <p className="text-gray-600 mb-6">
          Share your blessings and wishes for the reunion!
        </p>
        <div className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={4}
            placeholder="Write your blessing or wish here..."
          />
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Send Blessing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 