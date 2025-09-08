// src/constants/index.js

export const navLinks = [
  { id: 1, name: 'Услуги',      href: '/services' },
  { id: 2, name: 'Для инвестиций',  href: '/internal'   },
  { id: 3, name: 'Портфолио',   href: '/ourservices'    },
  { id: 4, name: 'Контакты',    href: '/contact' },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Екатерина Л.',
    position: 'Маркетинг-директор, розница',
    img: 'assets/review1.png',
    review:
      'Команда быстро разобралась в нише и собрала воронку: сайт, квизы, SMM и аналитика. Лиды подешевели, отдел продаж стал работать осмысленнее. Рекомендуем.',
  },
  {
    id: 2,
    name: 'Михаил Р.',
    position: 'Основатель финтех-стартапа',
    img: 'assets/review2.png',
    review:
      'Ребята сделали MVP за 6 недель: дизайн, бэкенд, интеграции и дашборд. Запустились в срок, метрики прозрачные, связь 24/7. Отличная работа.',
  },
  {
    id: 3,
    name: 'Алина С.',
    position: 'Операционный директор HoReCa',
    img: 'assets/review3.png',
    review:
      'Запуск рекламы + контент дал рост бронирований в 2,3 раза. Понравилось, что каждый спринт — с цифрами и гипотезами. Вижу результат, а не отчёты ради отчётов.',
  },
  {
    id: 4,
    name: 'Ильдар Н.',
    position: 'CEO EdTech-проекта',
    img: 'assets/review4.png',
    review:
      'Собрали лендинг, квиз и Telegram-бота, подключили оплату и аналитику. Получили предсказуемый поток заявок и понятную юнит-экономику.',
  },
];

// Ниже — русские описания, но структура (texture/logo/tags) сохранена.
// Если хотите, подставим ваши реальные ссылки (unicorngo, broniboy и др.) — скажите какие именно к каким карточкам привязать.
export const myProjects = [
  {
    title: 'Podcastr — платформа подкастов с ИИ',
    desc: 'Веб-приложение, которое превращает текст в многоголосый озвученный подкаст. Управление тембрами, паузами и монтажом — прямо в браузере.',
    subdesc:
      'Архитектура под высокие нагрузки, быстрый рендер, очередь задач, биллинг и ролевая модель доступа. Оптимизировано под SEO и индексируемые страницы выпусков.',
    href: '', // можно добавить вашу ссылку; если пусто — кнопка скрывается
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'React',        path: '/assets/react.svg' },
      { id: 2, name: 'Tailwind',     path: 'assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript',   path: '/assets/typescript.png' },
      { id: 4, name: 'Framer Motion',path: '/assets/framer.png' },
    ],
  },
  {
    title: 'LiveDoc — совместное редактирование в реальном времени',
    desc: 'Редактор документов с мгновенной синхронизацией курсоров и изменений для тысяч пользователей одновременно.',
    subdesc:
      'Реализованы presence-индикаторы, история правок, комментарии и разрешения. Масштабирование за счёт WebSocket-шардинга и CRDT.',
    href: '',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'React',      path: '/assets/react.svg' },
      { id: 2, name: 'Tailwind',   path: 'assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Liveblocks', path: '/assets/framer.png' },
    ],
  },
  {
    title: 'CarePulse — медицинская платформа',
    desc: 'Онлайн-регистрация пациентов, расписание, медкарты и напоминания. Упрощает работу клиники и снижает нагрузку на ресепшен.',
    subdesc:
      'Безопасное хранение данных, события и триггеры уведомлений, антидубли и гибкая отчётность. Интеграции со сторонними сервисами.',
    href: '',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'React',      path: '/assets/react.svg' },
      { id: 2, name: 'Tailwind',   path: 'assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'SaaS',       path: '/assets/framer.png' },
    ],
  },
  {
    title: 'Horizon — онлайн-банкинг',
    desc: 'Единая панель финансов: подключение банков, транзакции, переводы и аналитика расходов.',
    subdesc:
      'Двухфакторная аутентификация, маскирование данных, очереди платежей и мониторинг событий. Гибкие роли и лимиты.',
    href: '',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'React',      path: '/assets/react.svg' },
      { id: 2, name: 'Tailwind',   path: 'assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Next.js',    path: '/assets/framer.png' },
    ],
  },
  {
    title: 'Imaginify — AI-редактор изображений',
    desc: 'Веб-сервис для генерации и улучшения фото с оплатой по кредитам и личным кабинетом.',
    subdesc:
      'Очереди рендеринга, предпросмотры, история операций и безопасный биллинг. Кэширование и CDN для скорости.',
    href: '',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      { id: 1, name: 'React',      path: '/assets/react.svg' },
      { id: 2, name: 'Tailwind',   path: 'assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'AI',         path: '/assets/framer.png' },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Прототипирование',
    pos: 'Ведущие продуктовые дизайнеры',
    duration: '2022 — наст. время',
    title:
      'Быстро валидируем идеи через интерактивные прототипы и UX-тесты. Показываем логику, сценарии и метрики до старта разработки.',
    icon: '/assets/framer.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Дизайн-система',
    pos: 'Product / Web-разработка',
    duration: '2020 — 2022',
    title:
      'Собираем единую библиотеку компонентов и токены бренда. Это ускоряет разработку, повышает качество и снижает стоимость поддержки.',
    icon: '/assets/figma.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Процессы и документация',
    pos: 'Ведение проектов',
    duration: '2019 — 2020',
    title:
      'Управляем спринтами, гипотезами и рисками. Поддерживаем единый knowledge base, чтобы команда и заказчик всегда были «на одной странице».',
    icon: '/assets/notion.svg',
    animation: 'salute',
  },
];
