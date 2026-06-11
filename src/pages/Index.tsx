import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/ad07cf13-f002-46b6-bffa-37bcb8cad051.jpg";
const ROLLING_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/5585df9e-dc7d-4838-90b7-cba11bc11089.jpg";
const MINING_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/b8419699-c6c4-4f96-a1ca-afb747fd2bf8.jpg";
const PRODUCTS_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/f741b01b-df22-4b26-9740-58b0285fa8b3.jpg";
const CONVERTER_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/d741dedc-44bb-41b3-93d3-f529899033c4.jpg";

const steelSteps = [
  {
    step: "1",
    icon: "Droplets",
    color: "bg-orange-500",
    title: "Загрузка лома",
    desc: "В конвертер загружают 70–80 т стального лома. Лом охлаждает реакцию и улучшает экономику плавки.",
  },
  {
    step: "2",
    icon: "Flame",
    color: "bg-red-600",
    title: "Заливка чугуна",
    desc: "350 т жидкого чугуна (1400°C) заливают поверх лома. Начинается экзотермическая реакция.",
  },
  {
    step: "3",
    icon: "Wind",
    color: "bg-blue-500",
    title: "Продувка O₂",
    desc: "Кислородная фурма опускается на 2 м от металла. 20 мин подачи O₂ под давлением 15 атм при 1620°C.",
  },
  {
    step: "4",
    icon: "Trash2",
    color: "bg-slate-500",
    title: "Удаление примесей",
    desc: "O₂ окисляет C→CO₂, Si, Mn, P, S. Известь связывает примеси в шлак, который всплывает и сливается.",
  },
  {
    step: "5",
    icon: "FlaskConical",
    color: "bg-purple-600",
    title: "Легирование",
    desc: "Феррохром, ферромарганец, феррованадий добавляют в ковш. Это придаёт стали нужные свойства.",
  },
  {
    step: "6",
    icon: "Layers",
    color: "bg-teal-600",
    title: "Непрерывная разливка",
    desc: "Сталь через погружной стакан разливают в МНЛЗ. Получают слябы 250×1600 мм для прокатного цеха.",
  },
];

const navItems = [
  { id: "hero", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "production", label: "Производство" },
  { id: "steel-detail", label: "Производство стали" },
  { id: "products", label: "Продукция" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map((n) => n.id);
      let current = "hero";
      for (const id of sections) {
        const el = sectionRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) current = id;
        }
      }
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-ibm">
      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-steel-900 shadow-xl" : "bg-steel-900/85 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-oswald text-xl font-bold text-white tracking-widest hover:text-blue-300 transition-colors"
          >
            STEEL<span className="text-blue-400">TECH</span>
          </button>
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-200 rounded ${
                  activeNav === item.id
                    ? "bg-blue-500 text-white"
                    : "text-steel-300 hover:text-white hover:bg-steel-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section
        ref={setRef("hero")}
        className="relative h-screen min-h-[700px] flex items-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900/96 via-steel-900/75 to-steel-900/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-medium tracking-widest px-4 py-2 rounded-full mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              ОСНОВАНА В 1963 ГОДУ · ТУЛА, РОССИЯ
            </div>
            <h1 className="font-oswald text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-6 animate-fade-in">
              ПРОИЗВОДИМ<br />
              <span className="text-blue-400">СТАЛЬ</span><br />
              ДЛЯ БУДУЩЕГО
            </h1>
            <p
              className="text-steel-200 text-lg leading-relaxed mb-10 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Полный металлургический цикл — от добычи железной руды<br />
              до готового стального проката для строительства и промышленности.
            </p>
            <div
              className="flex items-center gap-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <button
                onClick={() => scrollTo("production")}
                className="bg-blue-500 hover:bg-blue-400 text-white font-oswald font-semibold tracking-wider px-8 py-4 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
              >
                ПРОИЗВОДСТВЕННЫЙ ЦИКЛ
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="border border-steel-400 hover:border-white text-steel-300 hover:text-white font-oswald font-semibold tracking-wider px-8 py-4 text-sm transition-all duration-200"
              >
                О КОМПАНИИ
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-steel-400 hover:text-white transition-colors"
        >
          <span className="text-xs tracking-widest">ЛИСТАЙТЕ ВНИЗ</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-steel-900/90 backdrop-blur-sm border-t border-steel-700/50">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 gap-6">
            {[
              { num: "4.2 млн т", label: "Производство в год" },
              { num: "60+", label: "Лет на рынке" },
              { num: "12 000", label: "Сотрудников" },
              { num: "47", label: "Стран экспорта" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-oswald text-2xl font-bold text-blue-400">{stat.num}</div>
                <div className="text-steel-400 text-xs tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section ref={setRef("about")} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-blue-500 text-xs font-oswald tracking-widest mb-2">02 / О КОМПАНИИ</p>
              <h2 className="font-oswald text-5xl font-bold text-steel-900 tracking-tight">О КОМПАНИИ</h2>
            </div>
            <div className="h-px bg-steel-200 flex-1 mx-10 mb-3" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-14">
            {[
              { icon: "History", title: "История компании", text: "Основана в 1963 году как государственное предприятие, SteelTech прошла путь от небольшого завода до одного из крупнейших производителей стального проката в России. Сегодня компания объединяет 4 производственных площадки." },
              { icon: "Settings", title: "Современное оборудование", text: "Инвестиции в модернизацию составили более 12 млрд рублей за последние 5 лет. Установлены конвертеры DANIELI, машины непрерывного литья SMS Group и высокоскоростные прокатные станы." },
              { icon: "BadgeCheck", title: "Контроль качества", text: "Система менеджмента качества сертифицирована по ISO 9001:2015. Каждая партия продукции проходит 47 видов испытаний в собственной аккредитованной лаборатории." },
              { icon: "Leaf", title: "Экологическая ответственность", text: "Программа «Зелёная сталь» — снижение выбросов CO₂ на 30% к 2030 году. Внедрены системы улавливания пыли эффективностью 99.7% и замкнутый оборот воды." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-steel-100 rounded-xl p-8 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  <Icon name={item.icon as AnyIcon} size={22} className="text-blue-500" />
                </div>
                <h3 className="font-oswald text-xl font-semibold text-steel-900 mb-3 tracking-wide">{item.title}</h3>
                <p className="text-steel-600 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-steel-900 to-steel-800 rounded-2xl p-10 text-white">
            <div className="grid grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-oswald text-3xl font-bold mb-4 tracking-wide">НАША МИССИЯ</h3>
                <p className="text-steel-200 leading-relaxed">
                  Обеспечивать российскую промышленность качественным стальным прокатом,
                  применяя передовые технологии и принципы устойчивого развития.
                  Мы создаём металл, из которого строится страна.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "ISO 9001", label: "Сертификат качества" },
                  { num: "№3", label: "В России по объёму" },
                  { num: "99.7%", label: "Очистка выбросов" },
                  { num: "2030", label: "Год нулевых выбросов" },
                ].map((s) => (
                  <div key={s.label} className="bg-steel-700/50 rounded-xl p-4 text-center">
                    <div className="font-oswald text-xl font-bold text-blue-400 mb-1">{s.num}</div>
                    <div className="text-steel-300 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTION CYCLE ─── */}
      <section ref={setRef("production")} className="py-24 bg-steel-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-blue-500 text-xs font-oswald tracking-widest mb-2">03 / ПРОИЗВОДСТВО</p>
              <h2 className="font-oswald text-5xl font-bold text-steel-900 tracking-tight">ПРОИЗВОДСТВЕННЫЙ ЦИКЛ</h2>
            </div>
            <div className="h-px bg-steel-300 flex-1 mx-10 mb-3" />
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 hidden lg:block" style={{ top: "2.5rem" }} />

            <div className="grid grid-cols-6 gap-4">
              {[
                { num: "01", icon: "Mountain", title: "Добыча руды", color: "bg-stone-700", desc: "Открытые карьеры Курской магнитной аномалии. Экскаваторы LIEBHERR, самосвалы BELAZ до 220 т." },
                { num: "02", icon: "Filter", title: "Обогащение", color: "bg-amber-700", desc: "Дробление, магнитная сепарация, флотация. Концентрат 65–68% железа." },
                { num: "03", icon: "Flame", title: "Выплавка чугуна", color: "bg-orange-600", desc: "Доменная печь 35 м. Кокс + агломерат + известняк при 1500°C. Жидкий чугун." },
                { num: "04", icon: "Zap", title: "Производство стали", color: "bg-blue-600", desc: "Кислородный конвертер 350 т. Продувка O₂ 20 мин при 1620°C. Легирование." },
                { num: "05", icon: "Layers", title: "Прокатка", color: "bg-teal-600", desc: "Нагрев до 1250°C. Черновые и чистовые клети. Скорость 25 м/с." },
                { num: "06", icon: "Package", title: "Готовая продукция", color: "bg-green-600", desc: "Листы, арматура, балки, трубы. ОТК и аккредитованная лаборатория." },
              ].map((stage) => (
                <div key={stage.num} className="flex flex-col items-center text-center group">
                  <div className={`w-20 h-20 ${stage.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200 relative z-10`}>
                    <Icon name={stage.icon as AnyIcon} size={28} className="text-white" />
                  </div>
                  <span className="font-oswald text-xs text-blue-500 font-bold tracking-widest mb-1">{stage.num}</span>
                  <h4 className="font-oswald text-sm font-semibold text-steel-900 mb-2 tracking-wide">{stage.title}</h4>
                  <p className="text-steel-500 text-xs leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden">
              <img src={MINING_IMAGE} alt="Добыча руды" className="w-full h-56 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={ROLLING_IMAGE} alt="Прокатный стан" className="w-full h-56 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STEEL DETAIL ─── */}
      <section ref={setRef("steel-detail")} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-blue-500 text-xs font-oswald tracking-widest mb-2">04 / ТЕХНОЛОГИЯ</p>
              <h2 className="font-oswald text-5xl font-bold text-steel-900 tracking-tight">ПРОИЗВОДСТВО СТАЛИ</h2>
              <p className="text-steel-500 mt-2 text-sm">Кислородно-конвертерный процесс — детально</p>
            </div>
            <div className="h-px bg-steel-200 flex-1 mx-10 mb-3" />
          </div>

          {/* Photo + intro */}
          <div className="grid grid-cols-2 gap-10 mb-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={CONVERTER_IMAGE} alt="Кислородный конвертер" className="w-full h-80 object-cover" />
            </div>
            <div>
              <h3 className="font-oswald text-2xl font-bold text-steel-900 mb-4 tracking-wide">
                КИСЛОРОДНЫЙ КОНВЕРТЕР
              </h3>
              <p className="text-steel-600 leading-relaxed mb-4">
                Сердце сталеплавильного производства SteelTech — кислородный конвертер
                вместимостью <strong>350 тонн</strong>. Это грушевидный сосуд из стали,
                футерованный огнеупорным кирпичом. Он вращается на цапфах для слива металла и шлака.
              </p>
              <p className="text-steel-600 leading-relaxed mb-4">
                Весь процесс плавки занимает <strong>35–45 минут</strong>, из которых
                собственно продувка кислородом — около 20 минут. За сутки один конвертер
                выдаёт до <strong>30 плавок</strong>.
              </p>
              <div className="flex gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center flex-1 border border-blue-100">
                  <div className="font-oswald text-2xl font-bold text-blue-600">1620°C</div>
                  <div className="text-steel-500 text-xs mt-1">Температура расплава</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center flex-1 border border-orange-100">
                  <div className="font-oswald text-2xl font-bold text-orange-600">350 т</div>
                  <div className="text-steel-500 text-xs mt-1">Вместимость</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center flex-1 border border-green-100">
                  <div className="font-oswald text-2xl font-bold text-green-600">20 мин</div>
                  <div className="text-steel-500 text-xs mt-1">Продувка O₂</div>
                </div>
              </div>
            </div>
          </div>

          {/* Process schema */}
          <div className="bg-gradient-to-br from-steel-900 to-steel-800 rounded-2xl p-10 mb-10">
            <h3 className="font-oswald text-2xl font-bold text-white mb-8 tracking-wide text-center">
              СХЕМА ТЕХНОЛОГИЧЕСКОГО ПРОЦЕССА
            </h3>

            <div className="grid grid-cols-6 gap-3">
              {steelSteps.map((s, i) => (
                <div key={s.step} className="relative">
                  {i < steelSteps.length - 1 && (
                    <div className="absolute top-7 left-[calc(100%-6px)] w-3 flex items-center z-10">
                      <Icon name="ChevronRight" size={20} className="text-steel-500" />
                    </div>
                  )}
                  <div className="bg-steel-700/60 border border-steel-600/40 rounded-xl p-4 h-full hover:bg-steel-700/90 transition-colors">
                    <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon name={s.icon as AnyIcon} size={18} className="text-white" />
                    </div>
                    <div className="font-oswald text-blue-400 text-xs font-bold tracking-wider mb-1">ШАГ {s.step}</div>
                    <div className="font-oswald text-white text-sm font-semibold mb-2 leading-tight">{s.title}</div>
                    <p className="text-steel-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chemistry block */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={16} className="text-white" />
                </div>
                <h4 className="font-oswald text-lg font-bold text-red-800 tracking-wide">ЧУГУН (сырьё)</h4>
              </div>
              <div className="space-y-1 text-sm">
                {[["C (углерод)", "3.5–4.5%"], ["Si (кремний)", "0.5–1.2%"], ["Mn (марганец)", "0.3–0.8%"], ["P (фосфор)", "до 0.15%"], ["S (сера)", "до 0.05%"]].map(([el, val]) => (
                  <div key={el} className="flex justify-between text-red-700">
                    <span>{el}</span><span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
              <p className="text-red-600 text-xs mt-3">Высокое содержание примесей — нельзя использовать в строительстве</p>
            </div>

            <div className="bg-steel-900 rounded-xl p-6 text-white flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Icon name="Zap" size={28} className="text-white" />
              </div>
              <div className="font-oswald text-xl font-bold mb-2 tracking-wide">КОНВЕРТЕР</div>
              <div className="text-steel-300 text-sm mb-4">Продувка кислородом</div>
              <div className="text-blue-400 font-oswald text-sm">
                [C] + O₂ → CO₂↑<br />
                [Si] + O₂ → SiO₂<br />
                [Mn] + O₂ → MnO<br />
                [P] + O₂ → P₂O₅
              </div>
              <div className="mt-4 text-steel-400 text-xs">Примеси переходят в шлак и газ</div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-white" />
                </div>
                <h4 className="font-oswald text-lg font-bold text-green-800 tracking-wide">СТАЛЬ (продукт)</h4>
              </div>
              <div className="space-y-1 text-sm">
                {[["C (углерод)", "0.08–0.25%"], ["Si (кремний)", "0.15–0.35%"], ["Mn (марганец)", "0.4–1.6%"], ["P (фосфор)", "≤ 0.025%"], ["S (сера)", "≤ 0.015%"]].map(([el, val]) => (
                  <div key={el} className="flex justify-between text-green-700">
                    <span>{el}</span><span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
              <p className="text-green-600 text-xs mt-3">Соответствует ГОСТ 380, пригодна для строительства и машиностроения</p>
            </div>
          </div>

          {/* Grades */}
          <div className="mt-10 border border-steel-200 rounded-xl overflow-hidden">
            <div className="bg-steel-100 px-6 py-3 border-b border-steel-200">
              <h4 className="font-oswald font-bold text-steel-800 tracking-wide">МАРКИ СТАЛИ SteelTech</h4>
            </div>
            <div className="grid grid-cols-4 divide-x divide-steel-100">
              {[
                { grade: "Ст3сп", use: "Строительные конструкции", prop: "σт ≥ 245 МПа" },
                { grade: "09Г2С", use: "Сосуды давления, трубы", prop: "σт ≥ 345 МПа" },
                { grade: "30ХГСА", use: "Машиностроение", prop: "σт ≥ 785 МПа" },
                { grade: "08Х18Н10", use: "Нержавеющий прокат", prop: "σт ≥ 205 МПа" },
              ].map((g) => (
                <div key={g.grade} className="p-5">
                  <div className="font-oswald text-lg font-bold text-blue-600 mb-1">{g.grade}</div>
                  <div className="text-steel-700 text-sm font-medium mb-1">{g.use}</div>
                  <div className="text-steel-400 text-xs">{g.prop}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section ref={setRef("products")} className="py-24 bg-steel-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-blue-500 text-xs font-oswald tracking-widest mb-2">05 / ПРОДУКЦИЯ</p>
              <h2 className="font-oswald text-5xl font-bold text-steel-900 tracking-tight">ПРОДУКЦИЯ</h2>
            </div>
            <div className="h-px bg-steel-300 flex-1 mx-10 mb-3" />
          </div>

          <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
            <img src={PRODUCTS_IMAGE} alt="Готовая продукция SteelTech" className="w-full h-72 object-cover" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: "Square",
                title: "Листовой прокат",
                specs: ["Толщина: 1.5 — 80 мм", "Ширина: до 2350 мм", "Длина: до 12 000 мм"],
                desc: "Горячекатаные и холоднокатаные листы. Применяются в судостроении, вагоностроении, промышленном строительстве и производстве металлоконструкций.",
                badge: "Хит продаж",
                badgeColor: "bg-blue-500/20 text-blue-300",
              },
              {
                icon: "AlignJustify",
                title: "Арматура",
                specs: ["Диаметр: 8 — 40 мм", "Классы: А400, А500С", "Длина: 6, 9, 12 м"],
                desc: "Стержневая арматура периодического профиля — основной материал для армирования железобетонных конструкций любого назначения и сложности.",
                badge: "Строительный",
                badgeColor: "bg-green-500/20 text-green-300",
              },
              {
                icon: "Minus",
                title: "Металлические балки",
                specs: ["Двутавр: №10 — №60", "Швеллер: №5 — №40У", "Длина: 6 — 24 м"],
                desc: "Двутавровые балки и швеллеры для несущих конструкций промышленных зданий, мостовых сооружений и каркасного строительства.",
                badge: "Промышленное",
                badgeColor: "bg-orange-500/20 text-orange-300",
              },
              {
                icon: "Circle",
                title: "Стальные трубы",
                specs: ["Диаметр: 57 — 530 мм", "Стенка: 3.5 — 20 мм", "Длина: 6 — 12 м"],
                desc: "Бесшовные и электросварные трубы для нефтегазовой отрасли, тепловых и водопроводных сетей, машиностроительного производства.",
                badge: "Нефтегазовый",
                badgeColor: "bg-purple-500/20 text-purple-300",
              },
            ].map((product) => (
              <div
                key={product.title}
                className="bg-white border border-steel-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-steel-800 to-steel-900 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Icon name={product.icon as AnyIcon} size={24} className="text-blue-400" />
                    </div>
                    <span className={`${product.badgeColor} text-xs px-3 py-1 rounded-full font-medium tracking-wide`}>
                      {product.badge}
                    </span>
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-white tracking-wide">{product.title}</h3>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.specs.map((spec) => (
                      <span key={spec} className="bg-steel-100 text-steel-700 text-xs px-3 py-1.5 rounded font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <p className="text-steel-600 text-sm leading-relaxed mb-5">{product.desc}</p>
                  <button
                    onClick={() => scrollTo("contacts")}
                    className="w-full bg-steel-900 hover:bg-blue-600 text-white font-oswald font-semibold tracking-wider text-sm py-3 rounded-lg transition-all duration-200"
                  >
                    ЗАПРОСИТЬ ЦЕНУ
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <h3 className="font-oswald text-3xl font-bold mb-3 tracking-wide">ИЗГОТОВИМ ПО ВАШИМ РАЗМЕРАМ</h3>
            <p className="text-blue-100 mb-6">Нестандартные размеры, специальные марки стали, термообработка — обсудим любой запрос</p>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-white text-blue-700 font-oswald font-bold tracking-wider px-10 py-3 hover:bg-blue-50 transition-colors rounded"
            >
              СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ
            </button>
          </div>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section ref={setRef("contacts")} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-blue-500 text-xs font-oswald tracking-widest mb-2">06 / КОНТАКТЫ</p>
              <h2 className="font-oswald text-5xl font-bold text-steel-900 tracking-tight">КОНТАКТЫ</h2>
            </div>
            <div className="h-px bg-steel-200 flex-1 mx-10 mb-3" />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { icon: "MapPin", label: "Адрес", value: "300026, г. Тула, ул. Металлургов, д. 1" },
              { icon: "Phone", label: "Телефон", value: "+7 (4872) 55-00-10" },
              { icon: "Mail", label: "Email", value: "info@steeltech-tula.ru" },
            ].map((c) => (
              <div key={c.label} className="bg-white border border-steel-200 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as AnyIcon} size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-steel-500 text-xs font-medium tracking-wide mb-1">{c.label}</p>
                  <p className="text-steel-900 font-semibold">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="font-oswald text-2xl font-bold text-steel-900 mb-6 tracking-wide">ОТПРАВИТЬ ЗАПРОС</h3>
              {formSent ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={28} className="text-green-600" />
                  </div>
                  <h4 className="font-oswald text-xl font-bold text-green-800 mb-2">Заявка отправлена!</h4>
                  <p className="text-green-700 text-sm">Наш менеджер свяжется с вами в течение 2 рабочих часов.</p>
                  <button className="mt-4 text-green-700 text-sm underline" onClick={() => setFormSent(false)}>
                    Отправить ещё один запрос
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-4">
                  <div>
                    <label className="block text-steel-700 text-sm font-medium mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Петров"
                      className="w-full border border-steel-200 rounded-lg px-4 py-3 text-steel-900 placeholder-steel-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-steel-700 text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ivan@company.ru"
                      className="w-full border border-steel-200 rounded-lg px-4 py-3 text-steel-900 placeholder-steel-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-steel-700 text-sm font-medium mb-1.5">Сообщение</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Опишите ваш запрос, нужные объёмы и сроки..."
                      className="w-full border border-steel-200 rounded-lg px-4 py-3 text-steel-900 placeholder-steel-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-oswald font-bold tracking-wider py-4 text-sm transition-all duration-200 rounded-lg"
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                </form>
              )}
            </div>

            <div>
              <h3 className="font-oswald text-2xl font-bold text-steel-900 mb-6 tracking-wide">РЕЖИМ РАБОТЫ</h3>
              <div className="space-y-3 mb-8">
                {[
                  { day: "Пн — Пт", time: "08:00 — 18:00", note: "Офис и склад" },
                  { day: "Суббота", time: "09:00 — 14:00", note: "Только склад" },
                  { day: "Воскресенье", time: "Выходной", note: "" },
                ].map((r) => (
                  <div key={r.day} className="flex items-center justify-between py-3 border-b border-steel-100">
                    <span className="text-steel-700 font-medium">{r.day}</span>
                    <div className="text-right">
                      <span className="text-steel-900 font-semibold">{r.time}</span>
                      {r.note && <span className="text-steel-400 text-xs ml-2">— {r.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-steel-50 border border-steel-200 rounded-xl p-6">
                <h4 className="font-oswald text-lg font-semibold text-steel-900 mb-3 tracking-wide">ОТДЕЛ ПРОДАЖ</h4>
                <div className="space-y-2">
                  {[
                    { icon: "Phone", text: "+7 (4872) 55-00-11 — Металлопрокат" },
                    { icon: "Phone", text: "+7 (4872) 55-00-12 — Трубная продукция" },
                    { icon: "Mail", text: "sales@steeltech-tula.ru" },
                  ].map((c, i) => (
                    <p key={i} className="text-steel-600 text-sm flex items-center gap-2">
                      <Icon name={c.icon as AnyIcon} size={14} className="text-blue-500" />
                      {c.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-steel-900 text-steel-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <span className="font-oswald text-lg font-bold text-white tracking-widest">
              STEEL<span className="text-blue-400">TECH</span>
            </span>
            <p className="text-steel-500 text-xs mt-1">© 2024 ООО «СтилТех». Все права защищены.</p>
          </div>
          <div className="flex items-center gap-6">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-steel-400 hover:text-white text-sm transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
