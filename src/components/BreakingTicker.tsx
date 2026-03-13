import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const BreakingTicker = () => {
  const alerts = [
    'JUST IN: Malacañang, nagdeklara ng nationwide holiday para sa 2026.',
    'WEATHER: Signal No. 3, itinaas sa ilang bahagi ng Luzon dahil sa bagyo.',
    'EKONOMIYA: Piso, pumalo sa record high laban sa dolyar.',
    'SPORTS: PH National Team, pasok na sa World Cup finals.',
    'KALUSUGAN: Bagong health protocols sa public transport, epektibo na agad.',
  ];

  return (
    <div className='bg-slate-900 text-white py-2 overflow-hidden border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-4 flex items-center'>
        <div className='flex items-center space-x-2 bg-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mr-4 shrink-0'>
          <AlertCircle size={14} />
          <span>BALITA</span>
        </div>

        <div className='relative flex overflow-x-hidden'>
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='flex whitespace-nowrap space-x-12 py-1'
          >
            {alerts.map((alert, i) => (
              <span key={i} className='text-sm font-medium text-slate-300'>
                {alert}
              </span>
            ))}
            {alerts.map((alert, i) => (
              <span
                key={`dup-${i}`}
                className='text-sm font-medium text-slate-300'
              >
                {alert}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
