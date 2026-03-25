const PrivacyPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-16 text-slate-800'>
      {/* Header Section */}
      <header className='mb-12 border-b border-slate-200 pb-8'>
        <h1 className='text-4xl md:text-5xl font-serif font-black tracking-tighter mb-4 text-slate-900'>
          Patakaran sa Pagkapribado
        </h1>
        <p className='text-xl text-slate-500 font-medium'>
          Privacy Policy & Data Handling
        </p>
        <p className='text-sm text-slate-400 mt-4 uppercase tracking-widest font-semibold'>
          Huling Na-update: March 2026
        </p>
      </header>

      <div className='space-y-10 text-lg text-slate-600 leading-relaxed'>
        <section>
          <p>
            At{' '}
            <strong className='text-slate-900 font-bold'>
              Veritas Philippines
            </strong>
            , we believe that digital privacy is a fundamental right. Even as an
            academic initiative developed for our Science, Technology, and
            Society (STS) course, we are committed to being transparent about
            how user data is simulated, stored, and protected within this
            platform.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-serif font-bold text-slate-900 border-l-4 border-slate-900 pl-4'>
            1. Information Collection and Storage
          </h2>
          <p>
            Because Veritas Philippines operates as an educational
            demonstration, we do not actively collect, harvest, or sell
            sensitive personal data. There is no remote backend database
            tracking your personal browsing habits on this site.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-serif font-bold text-slate-900 border-l-4 border-slate-900 pl-4'>
            2. Cookies and Tracking Technologies
          </h2>
          <p>
            We do not employ third-party advertising trackers, pixels, or
            invasive analytics. Any cookies or session storage utilized by the
            platform are strictly for functional purposes (e.g., maintaining UI
            states or simulating user sessions for the project requirements).
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-serif font-bold text-slate-900 border-l-4 border-slate-900 pl-4'>
            3. Third-Party External Links
          </h2>
          <p>
            Our journalistic articles and academic reports may contain links to
            external sources or references. Veritas Philippines is not
            responsible for the privacy practices, tracking methods, or content
            of those external websites. We encourage our readers to remain
            vigilant and review the privacy policies of any site they visit.
          </p>
        </section>

        {/* Contact Section explicitly mentioning the STS Group */}
        <section className='mt-16 bg-slate-50 border border-slate-200 rounded-xl p-8'>
          <h2 className='text-2xl font-serif font-bold text-slate-900 mb-4'>
            4. Makipag-ugnayan sa Amin (Contact Us)
          </h2>
          <p className='mb-6'>
            If you have any questions or concerns regarding this Privacy Policy
            or the data handling practices of this STS academic project, please
            reach out to the development team:
          </p>
          <div className='bg-white p-6 rounded-lg border border-slate-100 shadow-sm'>
            <h3 className='font-bold text-slate-900 mb-2'>
              STS Group 3 Developers:
            </h3>
            <ul className='grid grid-cols-2 md:grid-cols-3 gap-3 text-base text-slate-700 font-medium'>
              <li className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-slate-900 rounded-full'></span>{' '}
                Gwyne
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-slate-900 rounded-full'></span> Rain
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-slate-900 rounded-full'></span>{' '}
                Marjorie
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-slate-900 rounded-full'></span> Shai
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-slate-900 rounded-full'></span>{' '}
                Therd
              </li>
              <li className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-slate-900 rounded-full'></span>{' '}
                Caitlin
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
