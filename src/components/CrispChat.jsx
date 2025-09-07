// CrispChat.jsx
import { useEffect } from "react";

export default function CrispChat() {
  useEffect(() => {
    // Agar allaqachon qo‘shilgan bo‘lsa, qayta qo‘shmaydi
    if (window.$crisp) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "7749f6b5-4f28-48cb-9075-fc43e66d0954";

    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      s.id = "crisp-script";
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    return () => {
      const el = document.getElementById("crisp-script");
      if (el) el.remove();
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, []);

  return null;
}
