const Footer = () => {
  return (
    <footer className="relative mt-10 border-t border-white/10">
      {/* gradient chiziq */}
      <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-500/70 via-violet-400/70 to-cyan-400/70" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* yuqori qator: havolalar + social + call */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
          <nav className="flex items-center gap-3 text-xs text-white/60">
            <a href="#!" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="text-white/30">|</span>
            <a href="#!" className="hover:text-white transition-colors">Privacy Policy</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://t.me/aomentertainment"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:scale-105 transition"
              aria-label="Telegram"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/3670/3670070.png" alt="tg" className="h-4 w-4" />
            </a>
            <a
              href="https://vk.com/id89111004793"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:scale-105 transition"
              aria-label="VK"
            >
              <img src="https://img.icons8.com/?size=100&id=13977&format=png&color=ffffff" alt="vk" className="h-4 w-4" />
            </a>
            <a
              href="https://l.likee.video/p/jQRMDB"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:scale-105 transition"
              aria-label="Likee"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Likee.svg" alt="likee" className="h-4 w-4" />
            </a>

            <a
              href="tel:+79111004793"
              className="ml-1 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 px-3 py-1.5 text-[12px] font-semibold text-slate-900 shadow-[0_8px_24px_-10px_rgba(168,85,247,0.45)] hover:brightness-110 transition"
              aria-label="Позвонить +7 911 100 4793"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-900/80 animate-pulse" />
              +7 911 100 4793
            </a>
          </div>
        </div>

        {/* IXCHAM REKVIZIT PANELI */}
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-1.5">
            {/* badge + INN/KPP */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80 border border-white/10">
                Реквизиты
              </span>
              <span className="text-[12px] text-white/80">
                <span className="font-semibold text-white">ИНН:</span> 7805819980
                <span className="mx-2 text-white/30">|</span>
                <span className="font-semibold text-white">КПП:</span> 780501001
              </span>
            </div>

            {/* manzillar – juda ixcham, truncate bilan */}
            <div
              className="text-[12px] text-white/75 md:flex-1 md:truncate"
              title="улица Ивана Черных, д. Д. 29, корп./ст. ЛИТЕРА А, кв./оф. ПОМЕЩ. 58-Н ОФИС 1-4.1., г. Санкт-Петербург"
            >
              <span className="font-semibold text-white">Юридический адрес:</span>{' '}
              улица Ивана Черных,  Д. 29, корп./ст. ЛИТЕРА А, кв./оф. ПОМЕЩ. 58-Н ОФИС 1-4.1., г. Санкт-Петербург
            </div>

            <div
              className="text-[12px] text-white/75 md:flex-1 md:truncate"
              title="Полюстровский проспект 45, кабинет 201 Б"
            >
              <span className="font-semibold text-white">Адрес офиса:</span>{' '}
              Полюстровский проспект 45, кабинет 201 Б
            </div>
          </div>
        </div>

        {/* pastki satr */}
        <div className="pb-4 text-center text-[11px] text-white/45">
          © {new Date().getFullYear()} Adrian Hajdin. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
