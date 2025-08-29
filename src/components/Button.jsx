// src/components/Button.jsx
const Button = ({ name, variant = 'primary', icon = false, containerClass = '' }) => {
  const base = 'btn-base ' + containerClass;

  if (variant === 'ghost') {
    return (
      <button className={`${base} border border-white/20 bg-white/5 hover:bg-white/10 text-white`}>
        {name}
      </button>
    );
  }

  return (
    <button className={`${base} text-slate-900 bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 hover:brightness-110`}>
      {icon && (
        <span className="relative mr-2 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-60"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
        </span>
      )}
      {name}
    </button>
  );
};
export default Button;
