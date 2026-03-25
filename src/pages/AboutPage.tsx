const About = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-16 text-slate-800'>
      <header className='mb-12 border-b border-slate-200 pb-8'>
        <h1 className='text-4xl md:text-5xl font-serif font-black tracking-tighter mb-4 text-slate-900'>
          Tungkol sa Amin
        </h1>
        <p className='text-xl text-slate-500 font-medium'>
          Naghahatid ng katotohanan. Nagtatanggol sa kasaysayan.
        </p>
      </header>

      <div className='space-y-10 text-lg text-slate-600 leading-relaxed'>
        <section>
          <p>
            Welcome to{' '}
            <strong className='text-slate-900 font-bold'>
              Veritas Philippines
            </strong>
            , a premier digital news platform dedicated to providing accurate,
            timely, and deeply researched stories that shape the national
            discourse. Born out of a critical need for verified information, we
            aim to serve as a vigilant watchdog and a reliable bridge to the
            truth.
          </p>
        </section>

        <section className='grid md:grid-cols-3 gap-6 my-12'>
          <div className='bg-slate-50 p-6 rounded-xl border border-slate-100'>
            <h3 className='font-serif font-bold text-xl text-slate-900 mb-3'>
              Katotohanan
            </h3>
            <p className='text-base text-slate-600'>
              Inilalabas ang mga isyung madalas ibinabaon sa limot, nang walang
              pabor at walang takot.
            </p>
          </div>
          <div className='bg-slate-50 p-6 rounded-xl border border-slate-100'>
            <h3 className='font-serif font-bold text-xl text-slate-900 mb-3'>
              Integridad
            </h3>
            <p className='text-base text-slate-600'>
              Sumusunod sa pinakamataas na pamantayan ng pamamahayag at masusing
              pagsusuri ng datos.
            </p>
          </div>
          <div className='bg-slate-50 p-6 rounded-xl border border-slate-100'>
            <h3 className='font-serif font-bold text-xl text-slate-900 mb-3'>
              Lalim
            </h3>
            <p className='text-base text-slate-600'>
              Sinisiyasat ang mga panulukan ng pulitika, ekonomiya, agham, at
              teknolohiya.
            </p>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-serif font-bold text-slate-900'>
            Aming Misyon
          </h2>
          <p>
            Layunin naming bigyang-lakas ang mga mamamayang Pilipino sa
            pamamagitan ng tumpak na impormasyon. Sa panahon kung saan mabilis
            ang pagkalat ng disimpormasyon at maling balita, ang Veritas
            Philippines ay naninindigan bilang isang matibay na haligi ng
            mapagkakatiwalaang pamamahayag.
          </p>
          <p>
            We critically explore the intersections of{' '}
            <strong>
              Politics, Economy, Health, Lifestyle, and Technology
            </strong>
            , analyzing how these sectors influence the daily lives of Filipinos
            and the future of our republic.
          </p>
        </section>

        <section className='mt-16 bg-white border border-slate-200 rounded-xl p-8 shadow-sm'>
          <div className='text-center mb-10'>
            <h2 className='text-3xl font-serif font-bold text-slate-900'>
              Meet the team
            </h2>
            <p className='text-slate-500 mt-2 uppercase tracking-widest text-sm font-semibold'>
              Developed by STS Group 3
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 text-center'>
            {/* Developer 1 */}
            <div>
              <div className='w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md'>
                G
              </div>
              <h4 className='font-bold text-slate-900'>Gwyne Justin</h4>
              <p className='text-sm text-slate-500 mt-1'>Developer / Member</p>
            </div>

            {/* Developer 2 */}
            <div>
              <div className='w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md'>
                R
              </div>
              <h4 className='font-bold text-slate-900'>Rain</h4>
              <p className='text-sm text-slate-500 mt-1'>Writer / Member</p>
            </div>

            {/* Developer 3 */}
            <div>
              <div className='w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md'>
                M
              </div>
              <h4 className='font-bold text-slate-900'>Marjorie</h4>
              <p className='text-sm text-slate-500 mt-1'>Writer / Member</p>
            </div>

            {/* Developer 4 */}
            <div>
              <div className='w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md'>
                S
              </div>
              <h4 className='font-bold text-slate-900'>Shai</h4>
              <p className='text-sm text-slate-500 mt-1'>Writer / Member</p>
            </div>

            {/* Developer 5 */}
            <div>
              <div className='w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md'>
                T
              </div>
              <h4 className='font-bold text-slate-900'>Therd</h4>
              <p className='text-sm text-slate-500 mt-1'>Developer / Member</p>
            </div>

            {/* Developer 6 */}
            <div>
              <div className='w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md'>
                C
              </div>
              <h4 className='font-bold text-slate-900'>Caitlin</h4>
              <p className='text-sm text-slate-500 mt-1'>Developer / Member</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
