import React, { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
// EarthCanvas — faqat kerak bo‘lganda yuklanadi
const LazyEarthCanvas = lazy(async () => {
  const m = await import("./canvas");
  return { default: m.EarthCanvas };
});
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

/** ---------- EmailJS sozlamalari (ENV O'RNIGA SHU FAYL ICHIDA) ---------- */
const EMAILJS = {
  SERVICE_ID: "service_9uofmsp",
  TEMPLATE_ID: "template_auzwdzn",
  PUBLIC_KEY: "9HKMbL4I6ZZt6k9hA",
};

/* 🔑 SDK-ni modul darajasida init qilamiz (prefiks talab qilmaydi) */
try {
  const PK = (EMAILJS.PUBLIC_KEY || "").trim();
  if (!PK) {
    console.warn("EmailJS PUBLIC_KEY bo'sh — yuborish ishlamaydi.");
  } else {
    // Yangi SDK’larda obyekt bilan init qilish tavsiya etiladi
    emailjs.init({ publicKey: PK });
  }
} catch (e) {
  console.error("EmailJS init error:", e);
}

const RECEIVERS = [
  { name: "Edouard Shtefan", email: "edouard.shtefan@yandex.ru" },
  { name: "Saidaliyev Jasur", email: "saidaliyevjasur450@gmail.com" },
];

/** WebGL bor-yo'qligini tekshirish — yo'q bo'lsa 3D-ni umuman yuklamaymiz */
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState({ type: "", text: "" });

  // 3D optimizatsiyasi: faqat vьюportga kirganda va WebGL bo'lsa
  const container3DRef = useRef(null);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !hasWebGL()) {
      setShouldRender3D(false);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender3D(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (container3DRef.current) obs.observe(container3DRef.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const showBanner = (type, text) => {
    setBanner({ type, text });
    setTimeout(() => setBanner({ type: "", text: "" }), 3500);
  };

  const isValidEmail = useMemo(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (email) => re.test(email.trim());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showBanner("error", "Заполните все поля, пожалуйста.");
      return;
    }
    if (!isValidEmail(form.email)) {
      showBanner("error", "Введите корректный e-mail.");
      return;
    }

    setLoading(true);

    const payload = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    };

    try {
      await Promise.all(
        RECEIVERS.map((rcpt) =>
          emailjs.send(
            EMAILJS.SERVICE_ID,
            EMAILJS.TEMPLATE_ID,
            {
              ...payload,
              to_name: rcpt.name,
              to_email: rcpt.email,
            },
            /* 🧰 Yangi SDK’da 4-parametr obyekt bo‘lishi mumkin */
            { publicKey: EMAILJS.PUBLIC_KEY.trim() }
          )
        )
      );

      setLoading(false);
      showBanner("success", "Спасибо! Мы свяжемся с вами в ближайшее время.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setLoading(false);
      showBanner("error", "Упс… что-то пошло не так. Попробуйте ещё раз.");
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      {/* Forma (chap) */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl relative"
      >
        <div className="absolute inset-x-0 -top-px h-[2px] rounded-t-2xl bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400/90" />

        <p className={`${styles.sectionSubText} text-white/70`}>Связаться с нами</p>
        <h3 className={`${styles.sectionHeadText} leading-tight`}>
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Контакты
          </span>
          .
        </h3>

        {banner.text ? (
          <div
            className={`mt-6 mb-2 rounded-xl px-4 py-3 text-sm ${
              banner.type === "success"
                ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
                : "bg-rose-500/15 text-rose-200 border border-rose-400/30"
            }`}
          >
            {banner.text}
          </div>
        ) : null}

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Ваше имя</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
              aria-label="Ваше имя"
              className="bg-[#13151d] py-4 px-5 placeholder:text-white/40 text-white rounded-xl outline-none border border-white/10 focus:border-transparent focus:ring-2 focus:ring-violet-400/70 transition-all"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Ваш e-mail</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              aria-label="Ваш e-mail"
              className="bg-[#13151d] py-4 px-5 placeholder:text-white/40 text-white rounded-xl outline-none border border-white/10 focus:border-transparent focus:ring-2 focus:ring-cyan-300/70 transition-all"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Сообщение</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Коротко опишите задачу или вопрос…"
              aria-label="Сообщение"
              className="bg-[#13151d] py-4 px-5 placeholder:text-white/40 text-white rounded-xl outline-none border border-white/10 focus:border-transparent focus:ring-2 focus:ring-fuchsia-400/70 transition-all"
            />
          </label>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-white/60">
              Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 text-slate-900 font-semibold px-6 py-3 rounded-xl shadow-[0_12px_30px_-10px_rgba(168,85,247,0.45)] hover:brightness-110 disabled:opacity-70 transition"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                  Отправляем…
                </>
              ) : (
                "Отправить"
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* 3D blok (o'ng) — faqat kerak bo'lganda */}
      <motion.div
        ref={container3DRef}
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative"
      >
        {/* Yengil fon — zudlik bilan chiziladi */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />

        {/* 3D faqat shartlar bajarilganda */}
        {shouldRender3D ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                Загрузка 3D…
              </div>
            }
          >
            <LazyEarthCanvas />
          </Suspense>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-white/60 text-sm">Интерактив появится при прокрутке</div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
