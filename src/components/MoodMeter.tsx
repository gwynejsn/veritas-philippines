import { AnimatePresence, motion } from 'framer-motion';
import {
  Angry,
  CheckCircle,
  Frown,
  Laugh,
  ShieldAlert,
  Smile,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const moods = [
  {
    label: 'Masaya',
    icon: Smile,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  { label: 'Malungkot', icon: Frown, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Galit', icon: Angry, color: 'text-red-500', bg: 'bg-red-50' },
  {
    label: 'Inspired',
    icon: Zap,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    label: 'Takot',
    icon: ShieldAlert,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  { label: 'Natutuwa', icon: Laugh, color: 'text-pink-500', bg: 'bg-pink-50' },
];

const MoodMeter = () => {
  const [votes, setVotes] = useState<Record<string, number>>({
    Masaya: 124,
    Malungkot: 45,
    Galit: 289,
    Inspired: 67,
    Takot: 156,
    Natutuwa: 32,
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleVote = (label: string) => {
    if (hasVoted) return;

    setVotes((prev: Record<string, number>) => ({
      ...prev,
      [label]: prev[label] + 1,
    }));
    setHasVoted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalVotes: number = (Object.values(votes) as number[]).reduce(
    (a: number, b: number): number => a + b,
    0
  );

  return (
    <div className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm'>
      <h3 className='text-xl font-serif font-bold mb-4 text-slate-800'>
        Ano ang nararamdaman mo sa balitang ito?
      </h3>

      <div className='grid grid-cols-3 sm:grid-cols-6 gap-3'>
        {moods.map((mood) => {
          const voteCount = votes[mood.label] || 0;
          const percentage =
            totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          return (
            <button
              key={mood.label}
              onClick={() => handleVote(mood.label)}
              disabled={hasVoted}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                hasVoted
                  ? 'cursor-default'
                  : 'hover:bg-slate-50 active:scale-95'
              } ${mood.bg}`}
            >
              <mood.icon className={`mb-2 ${mood.color}`} size={28} />
              <span className='text-xs font-semibold text-slate-600 mb-1'>
                {mood.label}
              </span>
              <span className='text-sm font-bold text-slate-800'>
                {percentage}%
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 z-50'
          >
            <CheckCircle size={20} className='text-emerald-400' />
            <span className='font-medium'>Salamat sa iyong feedback!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodMeter;
