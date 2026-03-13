import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const LiveCounter = () => {
  const [count, setCount] = useState<number>(2450);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate between 1,240 and 4,890
      const newCount = Math.floor(Math.random() * (4890 - 1240 + 1)) + 1240;
      setCount(newCount);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center space-x-2 text-red-600 font-medium text-sm bg-red-50 px-3 py-1 rounded-full border border-red-100'>
      <div className='relative flex h-2 w-2'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-2 w-2 bg-red-600'></span>
      </div>
      <Users size={14} />
      <span>{count.toLocaleString()} ang nagbabasa ngayon</span>
    </div>
  );
};

export default LiveCounter;
