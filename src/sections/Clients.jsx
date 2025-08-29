// src/sections/Clients.jsx
import { clientReviews } from '../constants/index.js';

const StarRow = ({ rating = 5 }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <img
        key={i}
        src="/assets/star.png"
        alt="star"
        className={`w-5 h-5 ${i < rating ? 'opacity-100' : 'opacity-30'}`}
      />
    ))}
  </div>
);

const Clients = () => {
  return (
    <section className="c-space my-20" id="reviews">
      {/* Sarlavha */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-white/70">доверие и результат</p>
        <h3 className="head-text mt-1">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Отзывы клиентов
          </span>
        </h3>
      </div>

      {/* Neon fon blur */}
      <div className="relative mt-10">
        <div className="pointer-events-none absolute -z-10 -top-16 -right-16 h-72 w-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="pointer-events-none absolute -z-10 -bottom-16 -left-16 h-72 w-72 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />

        <div className="client-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientReviews.map((item) => (
            <article
              key={`review-${item.id}`}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_-20px_rgba(168,85,247,0.25)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* Gradient chekka chiziq */}
              <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400/90 rounded-t-2xl" />

              {/* Qo‘shtirnoq belgisi */}
              <div className="absolute -top-4 left-6 h-8 w-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80">
                <span className="text-lg">“</span>
              </div>

              {/* Matn */}
              <p className="text-white/85 font-light leading-relaxed">
                {item.review}
              </p>

              {/* Pastki blok: muallif + yulduzlar */}
              <div className="client-content mt-5 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-white/60 md:text-base text-sm font-light">{item.position}</p>
                  </div>
                </div>

                <div className="self-end">
                  {/* Agar item.rating bo‘lsa shuni, bo‘lmasa 5 ta to‘liq yulduz */}
                  <StarRow rating={item.rating ?? 5} />
                </div>
              </div>

              {/* Hover porlash effekti */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ boxShadow: '0 0 80px -30px rgba(168,85,247,0.7)' }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
