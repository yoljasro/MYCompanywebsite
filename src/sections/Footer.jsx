const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-4">
        {/* Telegram */}
        <a
          href="https://t.me/aomentertainment"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670070.png"
            alt="telegram"
            className="w-8 h-8"
          />
        </a>

        {/* VK */}
        <a
          href="https://vk.com/id89111004793"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src="https://img.icons8.com/?size=100&id=13977&format=png&color=000000"
            alt="vk"
            className="w-8 h-8"
          />
        </a>

        {/* Likee */}
        <a
          href="https://l.likee.video/p/jQRMDB"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/01/Likee.svg"
            alt="likee"
            className="w-8 h-8"
          />
        </a>
      </div>

      <p className="text-white-500">© 2024 Adrian Hajdin. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
