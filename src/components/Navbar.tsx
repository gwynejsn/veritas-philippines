import { AnimatePresence, motion } from 'framer-motion';
import { Globe, LogOut, Mail, Menu, Search, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const {
    user,
    login,
    logout,
    isSidebarOpen,
    toggleSidebar,
    isSearchOpen,
    toggleSearch,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Pulitika',
    'Ekonomiya',
    'Kalusugan',
    'Pamumuhay',
    'Teknolohiya',
    'Opinyon',
  ];

  const handleLogin = (e: React.FormEvent) => {
    // TODO: ilagay sa local storage yung login details para pag nag refresh hindi mawala?
    e.preventDefault();
    if (email) {
      login(email);
      setIsLoginModalOpen(false);
      setEmail('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toggleSearch();
    navigate(`/?search=${searchQuery}`);
  };

  return (
    <>
      <nav className='bg-white border-b border-slate-200 sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* Top Bar */}
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center space-x-6'>
              <button
                onClick={toggleSidebar}
                className='text-slate-600 hover:text-slate-900 transition-colors'
              >
                <Menu size={24} />
              </button>
              <div className='hidden md:flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-widest'>
                <Globe size={14} />
                <span>Edisyong Pilipinas</span>
              </div>
            </div>

            <Link to='/' className='flex flex-col items-center group'>
              <h1 className='text-3xl md:text-4xl font-serif font-black tracking-tighter text-slate-900 group-hover:text-blue-700 transition-colors'>
                VERITAS PHILIPPINES
              </h1>
              <div className='h-1 w-full bg-slate-900 mt-1 group-hover:bg-blue-700 transition-colors'></div>
            </Link>

            <div className='flex items-center space-x-4'>
              <button
                onClick={toggleSearch}
                className='p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors'
              >
                <Search size={20} />
              </button>

              {user ? (
                <div className='flex items-center space-x-3'>
                  <div className='hidden sm:block text-right'>
                    <p className='text-xs font-bold text-slate-900'>
                      {user.name}
                    </p>
                    <p className='text-[10px] text-slate-500 uppercase tracking-tighter'>
                      {user.role}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className='p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors'
                    title='Mag-logout'
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className='hidden sm:flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors'
                >
                  <User size={16} />
                  <span>Mag-sign In</span>
                </button>
              )}
            </div>
          </div>

          {/* Categories Bar */}
          <div className='hidden md:flex justify-center space-x-8 py-3 border-t border-slate-100'>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className='text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-wide transition-colors'
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50'
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 left-0 bottom-0 w-80 bg-white z-[60] shadow-2xl p-8'
            >
              <div className='flex justify-between items-center mb-12'>
                <h2 className='text-2xl font-serif font-black tracking-tighter'>
                  MENU
                </h2>
                <button
                  onClick={toggleSidebar}
                  className='p-2 hover:bg-slate-100 rounded-full'
                >
                  <X size={24} />
                </button>
              </div>

              <div className='space-y-8'>
                <div>
                  <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-4'>
                    Mga Seksyon
                  </h3>
                  <div className='grid grid-cols-1 gap-4'>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat.toLowerCase()}`}
                        onClick={toggleSidebar}
                        className='text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors'
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className='pt-8 border-t border-slate-100'>
                  <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-4'>
                    Kumpanya
                  </h3>
                  <ul className='space-y-4 text-slate-300 font-medium'>
                    <li>
                      <Link
                        to='/about-us'
                        onClick={toggleSidebar}
                        className='text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors'
                      >
                        Tungkol sa Amin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/privacy'
                        onClick={toggleSidebar}
                        className='text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors'
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className='pt-8 border-t border-slate-100'>
                  <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-4'>
                    Account
                  </h3>
                  {user ? (
                    <button
                      onClick={logout}
                      className='flex items-center space-x-2 text-red-600 font-bold'
                    >
                      <LogOut size={18} />
                      <span>Mag-sign Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        toggleSidebar();
                      }}
                      className='flex items-center space-x-2 text-blue-600 font-bold'
                    >
                      <User size={18} />
                      <span>Mag-sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='fixed inset-0 bg-white z-[70] p-8'
          >
            <div className='max-w-4xl mx-auto'>
              <div className='flex justify-end mb-12'>
                <button
                  onClick={toggleSearch}
                  className='p-2 hover:bg-slate-100 rounded-full'
                >
                  <X size={32} />
                </button>
              </div>
              <form onSubmit={handleSearch} className='relative'>
                <input
                  autoFocus
                  type='text'
                  placeholder='Maghanap ng balita...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full text-4xl md:text-6xl font-serif font-bold border-b-4 border-slate-900 pb-4 focus:outline-none placeholder:text-slate-200'
                />
                <button
                  type='submit'
                  className='absolute right-0 bottom-6 text-slate-400 hover:text-slate-900'
                >
                  <Search size={48} />
                </button>
              </form>
              <div className='mt-12'>
                <h3 className='text-sm font-black text-slate-400 uppercase tracking-widest mb-6'>
                  Sikat na Searches
                </h3>
                {/* suggestions */}
                <div className='flex flex-wrap gap-3'>
                  {[
                    'Student Subsidy',
                    'Tallano Gold',
                    'TikTok Ban',
                    'Heatwave',
                    'Steam Accounts',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                      }}
                      className='px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors'
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center z-[80] p-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 overflow-hidden'
            >
              <div className='absolute top-0 left-0 w-full h-2 bg-blue-600'></div>
              <h2 className='text-3xl font-serif font-black tracking-tighter mb-2'>
                MALIGAYANG PAGBABALIK
              </h2>
              <p className='text-slate-500 text-sm mb-8'>
                Mag-sign in para ma-access ang mga eksklusibong balita.
              </p>

              <form onSubmit={handleLogin} className='space-y-6'>
                <div>
                  <label className='block text-xs font-black text-slate-400 uppercase tracking-widest mb-2'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <Mail
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                      size={18}
                    />
                    <input
                      required
                      type='email'
                      placeholder='pangalan@halimbawa.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors'
                >
                  Ipagpatuloy
                </button>
              </form>

              <div className='mt-8 pt-8 border-t border-slate-100 text-center'>
                <p className='text-xs text-slate-400'>
                  Sa pagpapatuloy, sumasang-ayon ka sa aming Terms of Service at
                  Privacy Policy.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
