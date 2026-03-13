// FIX: Corrected the alias to avoid conflict with the actual Route component
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BreakingTicker from './components/BreakingTicker';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import ArticlePage from './pages/ArticlePage';
import Home from './pages/Home';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className='min-h-screen flex flex-col font-sans'>
          <Navbar />
          <BreakingTicker />

          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />

              {/* yung term na slug is like Article title */}
              <Route path='/article/:slug' element={<ArticlePage />} />

              <Route path='/category/:category' element={<Home />} />

              <Route path='*' element={<Home />} />
            </Routes>
          </main>

          {/* Footer Section */}
          <footer className='bg-slate-900 text-white py-16 mt-24'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
                <div className='col-span-1 md:col-span-2'>
                  <h2 className='text-3xl font-serif font-black tracking-tighter mb-6'>
                    VERITAS PHILIPPINES
                  </h2>
                  <p className='text-slate-400 max-w-md leading-relaxed'>
                    Ang Veritas Philippines ay isang premier digital news
                    platform na nakatuon sa pagbibigay ng tumpak, napapanahon,
                    at makabuluhang mga kwento na humuhubog sa pambansang
                    diskurso. Ang aming misyon ay bigyang-lakas ang mga
                    mamamayan sa pamamagitan ng impormasyon.
                  </p>
                </div>

                <div>
                  <h4 className='font-bold uppercase tracking-widest text-sm mb-6 text-slate-500'>
                    Mga Seksyon
                  </h4>
                  <ul className='space-y-4 text-slate-300 font-medium'>
                    <li>
                      <Link
                        to='/category/pulitika'
                        className='hover:text-white transition-colors'
                      >
                        Pulitika
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/category/ekonomiya'
                        className='hover:text-white transition-colors'
                      >
                        Ekonomiya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/category/kalusugan'
                        className='hover:text-white transition-colors'
                      >
                        Kalusugan
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/category/pamumuhay'
                        className='hover:text-white transition-colors'
                      >
                        Pamumuhay
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/category/teknolohiya'
                        className='hover:text-white transition-colors'
                      >
                        Teknolohiya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/category/opinyon'
                        className='hover:text-white transition-colors'
                      >
                        Opinyon
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-bold uppercase tracking-widest text-sm mb-6 text-slate-500'>
                    Kumpanya
                  </h4>
                  <ul className='space-y-4 text-slate-300 font-medium'>
                    <li>
                      <Link
                        to='/'
                        className='hover:text-white transition-colors'
                      >
                        Tungkol sa Amin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/'
                        className='hover:text-white transition-colors'
                      >
                        Kontak
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/'
                        className='hover:text-white transition-colors'
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/'
                        className='hover:text-white transition-colors'
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6'>
                <p className='text-slate-500 text-sm'>
                  © 2026 Veritas Philippines. This website is intended only for
                  our SOUP Requirement in STS.
                </p>
                <div className='flex space-x-6 text-slate-500'>
                  <a
                    href='https://facebook.com'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-white transition-colors'
                  >
                    Facebook
                  </a>
                  <a
                    href='https://twitter.com'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-white transition-colors'
                  >
                    Twitter
                  </a>
                  <a
                    href='https://instagram.com'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-white transition-colors'
                  >
                    Instagram
                  </a>
                  <a
                    href='https://linkedin.com'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-white transition-colors'
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
