import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import type React from 'react';
import { Link } from 'react-router-dom';
import { type Article } from '../data/newsData';

interface NewsCardProps {
  article: Article;
  variant?: 'large' | 'medium' | 'small' | 'horizontal';
}

export const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMins / 60);

  if (diffInMins < 1) return 'Ngayon lang';
  if (diffInMins < 60) return `${diffInMins}m nakalipas`;
  if (diffInHours < 24) return `${diffInHours}h nakalipas`;
  return past.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
};

const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'medium' }) => {
  const isLarge = variant === 'large';
  const isSmall = variant === 'small';
  const isHorizontal = variant === 'horizontal';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
        isHorizontal ? 'flex flex-col sm:flex-row' : ''
      }`}
    >
      <Link
        to={`/article/${article.slug}`}
        className={`block relative overflow-hidden ${
          isHorizontal ? 'sm:w-1/3' : 'w-full'
        }`}
      >
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy='no-referrer'
          loading='lazy'
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isLarge
              ? 'aspect-video'
              : isSmall
              ? 'aspect-square'
              : 'aspect-[4/3]'
          }`}
        />
        <div className='absolute top-4 left-4'>
          <span className='bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg'>
            {article.category}
          </span>
        </div>
      </Link>

      <div
        className={`p-5 ${
          isHorizontal ? 'sm:w-2/3 flex flex-col justify-center' : ''
        }`}
      >
        <div className='flex items-center space-x-2 mb-3'>
          <div className='flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider'>
            <Clock size={12} className='mr-1' />
            {formatTimeAgo(article.date)}
          </div>
          <span className='text-slate-300'>•</span>
          <div className='flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-wider'>
            {article.author}
            {article.isVerified && (
              <CheckCircle size={10} className='ml-1 text-blue-500' />
            )}
          </div>
        </div>

        <Link to={`/article/${article.slug}`}>
          <h3
            className={`font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight mb-2 ${
              isLarge
                ? 'text-2xl md:text-3xl'
                : isSmall
                ? 'text-base'
                : 'text-xl'
            }`}
          >
            {article.title}
          </h3>
        </Link>

        {!isSmall && (
          <p className='text-slate-600 text-sm leading-relaxed line-clamp-2'>
            {article.excerpt}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default NewsCard;
