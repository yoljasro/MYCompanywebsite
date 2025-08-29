import { useEffect, useMemo, useState } from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {}, active = '' }) => (
  <ul className="nav-ul gap-6">
    {navLinks.map((item) => {
      const isActive =
        active === item.href || active === item.hash || active === item.name;

      return (
        <li key={item.id} className="nav-li relative group">
          <a
            href={item.href}
            onClick={onClick}
            className={`nav-li_a transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
            }`}
          >
            {item.name}
            {/* underline */}
            <span
              className={`absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 transition-all duration-300 group-hover:w-full ${
                isActive ? 'w-full' : ''
              }`}
            />
          </a>
        </li>
      );
    })}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const [elevated, setElevated] = useState(false);

  const toggleMenu = () => setIsOpen((p) => !p);
  const closeMenu = () => setIsOpen(false);

  // Active link (hash yoki path)
  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash || '';
      const path = window.location.pathname || '/';
      setActive(hash || path);
    };
    handler();
    window.addEventListener('hashchange', handler);
    window.addEventListener('popstate', handler);
    return () => {
      window.removeEventListener('hashchange', handler);
      window.removeEventListener('popstate', handler);
    };
  }, []);

  // Scroll bo‘lganda ko‘tarilgan navbar (soyali)
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = useMemo(
    () => (
      <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(168,85,247,0.45)]">
        Our Logo
      </span>
    ),
    []
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all
      ${elevated
        ? 'backdrop-blur-xl bg-black/55 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'
        : 'backdrop-blur-sm bg-black/40'}`}
    >
      {/* yuqori gradient chiziq */}
      <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400/90" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <a href="/" className="text-xl font-bold tracking-wide">
            {brand}
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <NavItems active={active} />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-slate-900 
                         bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 hover:brightness-110
                         shadow-[0_10px_30px_-10px_rgba(168,85,247,0.45)] transition"
            >
              Связаться
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-900/80 animate-pulse" />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="sm:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:text-white"
          >
            <img
              src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-over menyu */}
      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-500 ${
          isOpen ? 'max-h-[60vh]' : 'max-h-0'
        }`}
      >
        <div className="mx-3 mb-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <nav className="p-5">
            <NavItems active={active} onClick={closeMenu} />
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-semibold text-slate-900 
                         bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300"
            >
              Связаться
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
