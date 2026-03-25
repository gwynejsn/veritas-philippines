import { CheckCircle, SearchX, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { newsData } from '../data/newsData';

const Home = () => {
  const [searchParams] = useSearchParams();
  const { category } = useParams<{ category?: string }>();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredNews = useMemo(() => {
    return newsData.filter((article) => {
      const matchesCategory =
        !category || article.category.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery) ||
        article.excerpt.toLowerCase().includes(searchQuery) ||
        article.content.some((p) => p.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }, [category, searchQuery]);

  const featured = filteredNews[0];
  const trending = newsData.slice(1, 5);
  const latest = filteredNews.slice(1);

  if (filteredNews.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-24 text-center'>
        <div className='inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6 text-slate-400'>
          <SearchX size={40} />
        </div>
        <h2 className='text-3xl font-serif font-bold mb-4'>
          Walang nahanap na resulta
        </h2>
        <p className='text-slate-600 mb-8'>
          Hindi kami makahanap ng mga artikulo para sa "{searchQuery}"{' '}
          {category ? `sa kategoryang ${category}` : ''}.
        </p>
        <Link
          to='/'
          className='inline-flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold'
        >
          <span>I-clear ang lahat ng filters</span>
        </Link>
      </div>
    );
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-8'>
      {/* Search/Category Header */}
      {(searchQuery || category) && (
        <div className='mb-12 border-b border-slate-200 pb-8'>
          <h2 className='text-sm font-black text-slate-400 uppercase tracking-widest mb-2'>
            {searchQuery ? 'Resulta ng Paghahanap para sa' : 'Kategorya'}
          </h2>
          <h1 className='text-4xl md:text-5xl font-serif font-black text-slate-900 capitalize'>
            {searchQuery ? `"${searchQuery}"` : category}
          </h1>
        </div>
      )}

      {/* Hero Section */}
      {!searchQuery && (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12'>
          <div className='lg:col-span-8'>
            <NewsCard article={featured} variant='large' />
          </div>
          <div className='lg:col-span-4'>
            <div className='flex items-center space-x-2 mb-6'>
              <TrendingUp className='text-red-600' size={20} />
              <h2 className='text-xl font-serif font-bold uppercase tracking-tight'>
                Sikat Ngayon
              </h2>
            </div>
            <div className='space-y-6'>
              {trending.map((article, idx) => (
                <div key={article.id} className='flex space-x-4 group'>
                  <span className='text-3xl font-serif font-black text-slate-200 group-hover:text-red-600 transition-colors'>
                    0{idx + 1}
                  </span>
                  <div>
                    <span className='text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block'>
                      {article.category}
                    </span>
                    <h3 className='font-serif font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors'>
                      <Link to={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Latest News Feed */}
        <div className='lg:col-span-8'>
          <div className='flex items-center justify-between mb-8 border-b-2 border-slate-900 pb-2'>
            <h2 className='text-2xl font-serif font-black uppercase tracking-tighter'>
              {searchQuery ? 'Resulta ng Paghahanap' : 'Pinakabagong Balita'}
            </h2>
          </div>

          <div className='space-y-8'>
            {searchQuery
              ? filteredNews.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant='horizontal'
                  />
                ))
              : latest.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant='horizontal'
                  />
                ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className='lg:col-span-4'>
          <div className='sticky-sidebar space-y-12'>
            {/* Newsletter */}
            <div className='bg-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-blue-200'>
              <h3 className='text-2xl font-serif font-bold mb-2'>
                Kunin ang Veritas Philippines
              </h3>
              <p className='text-blue-100 text-sm mb-6'>
                Ang pinakamahalagang balita, diretso sa iyong inbox tuwing
                umaga.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Matagumpay na nag-subscribe!');
                }}
                className='space-y-3'
              >
                <input
                  required
                  type='email'
                  placeholder='Iyong email address'
                  className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50'
                />
                <button
                  type='submit'
                  className='w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors'
                >
                  Mag-subscribe Na
                </button>
              </form>
            </div>

            {/* Most Read */}
            <div>
              <h3 className='text-xl font-serif font-bold mb-6 border-b border-slate-200 pb-2'>
                Pinaka-binabasa
              </h3>
              <div className='space-y-6'>
                {newsData.slice(0, 5).map((article) => (
                  <div key={article.id} className='group'>
                    <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block'>
                      {article.category}
                    </span>
                    <h4 className='font-serif font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors'>
                      <Link to={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Fact Check Banner */}
            <div className='bg-slate-900 rounded-2xl p-6 text-white'>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center'>
                  <CheckCircle size={18} className='text-white' />
                </div>
                <span className='font-bold text-sm'>
                  Beripikadong Katotohanan
                </span>
              </div>
              <p className='text-slate-400 text-sm leading-relaxed'>
                Lahat ng artikulo sa portal na ito ay sumasailalim sa mahigpit
                na fact-checking ng{' '}
                <span className='text-white font-bold'>
                  Independent Media Council (IMC)
                </span>
                .
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Home;
