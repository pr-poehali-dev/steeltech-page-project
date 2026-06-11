import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

type Section = "home" | "about" | "production" | "products" | "contacts";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/ad07cf13-f002-46b6-bffa-37bcb8cad051.jpg";
const ROLLING_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/5585df9e-dc7d-4838-90b7-cba11bc11089.jpg";
const MINING_IMAGE = "https://cdn.poehali.dev/projects/7254ac0c-a072-407a-8f2b-9891b36fb244/files/b8419699-c6c4-4f96-a1ca-afb747fd2bf8.jpg";

const productionStages = [
  {
    id: "mining",
    num: "01",
    title: "Добыча железной руды",
    short: "Открытая и подземная добыча на собственных месторождениях",
    icon: "Mountain",
    details: {
      description: "Добыча железной руды — начальный и ключевой этап всего производственного цикла. SteelTech разрабатывает месторождения в Курской и Белгородской областях.",
      points: [
        { label: "Где добывается", text: "Открытые карьеры глубиной до 350 метров и подземные шахты в Курской магнитной аномалии — одном из крупнейших железорудных бассейнов мира." },
        { label: "Как происходит добыча", text: "Буровзрывные работы разрушают горную породу, после чего экскаваторы грузят руду в карьерные самосвалы грузоподъёмностью до 220 тонн." },
        { label: "Оборудование", text: "Роторные экскаваторы LIEBHERR R 9800, карьерные самосвалы BELAZ-75710, буровые станки Atlas Copco для дробления породы." },
      ],
    },
  },
  {
    id: "enrichment",
    num: "02",
    title: "Обогащение руды",
    short: "Дробление, сортировка и получение железорудного концентрата",
    icon: "Filter",
    details: {
      description: "После добычи руда поступает на горно-обогатительный комбинат, где проходит несколько стадий обработки для повышения содержания железа.",
      points: [
        { label: "Дробление руды", text: "Крупные куски породы измельчаются в несколько этапов: от первичного дробления в щёковых дробилках до тонкого помола в шаровых мельницах." },
        { label: "Отделение компонентов", text: "Магнитная сепарация отделяет железосодержащие минералы от пустой породы. Флотационный метод дополнительно очищает концентрат." },
        { label: "Результат", text: "Железорудный концентрат с содержанием железа 65–68%, готовый к дальнейшей переработке в доменном цехе." },
      ],
    },
  },
  {
    id: "pig-iron",
    num: "03",
    title: "Выплавка чугуна",
    short: "Доменная печь превращает руду в жидкий металл",
    icon: "Flame",
    details: {
      description: "Доменный цех — сердце металлургического комбината. Здесь концентрат превращается в жидкий чугун при температуре свыше 1500°C.",
      points: [
        { label: "Доменная печь", text: "Доменная печь высотой 35 метров работает непрерывно. В неё загружают послойно агломерат (подготовленную руду), кокс и известняк." },
        { label: "Процесс плавки", text: "Раскалённый воздух (900°C) вдувается через фурмы. Кокс сгорает, выделяя CO, который восстанавливает железо из оксидов руды." },
        { label: "Удаление примесей", text: "Известняк связывает серу и другие примеси, образуя шлак. Жидкий чугун и шлак разделяются по плотности и выпускаются раздельно." },
      ],
    },
  },
  {
    id: "steel",
    num: "04",
    title: "Производство стали",
    short: "Кислородный конвертер — главная технология SteelTech",
    icon: "Zap",
    details: {
      description: "Это центральный и наиболее технологичный этап. Из жидкого чугуна с высоким содержанием углерода и примесей мы производим высококачественную сталь заданного состава.",
      points: [
        { label: "Загрузка конвертера", text: "В кислородный конвертер вместимостью 350 тонн заливают жидкий чугун (70–80%) и добавляют стальной лом (20–30%) для охлаждения." },
        { label: "Продувка кислородом", text: "Через водоохлаждаемую фурму подаётся технически чистый кислород под давлением. Процесс длится 18–22 минуты при температуре 1620°C." },
        { label: "Удаление примесей", text: "Кислород окисляет углерод (выходит как CO₂), а также кремний, марганец и фосфор. Образующийся шлак поглощает оставшиеся примеси." },
        { label: "Легирование", text: "После продувки добавляют ферросплавы: феррохром, ферромарганец, феррованадий. Это придаёт нужные свойства прочности и твёрдости." },
        { label: "Разливка стали", text: "Готовая сталь разливается на машинах непрерывного литья в заготовки — слябы и блюмы для прокатного цеха." },
      ],
    },
  },
  {
    id: "rolling",
    num: "05",
    title: "Прокатка металла",
    short: "Горячая и холодная прокатка в готовые профили",
    icon: "Layers",
    details: {
      description: "В прокатном цехе стальные заготовки превращаются в готовый прокат — листы, профили и арматуру различных сечений.",
      points: [
        { label: "Нагрев заготовок", text: "Слябы нагревают в проходных печах до 1150–1250°C. Равномерный нагрев обеспечивает хорошую пластичность металла при прокатке." },
        { label: "Прокатные станы", text: "Черновые клети обжимают заготовку до промежуточного размера, чистовые — до конечного профиля. Скорость прокатки достигает 25 м/с." },
        { label: "Готовый прокат", text: "На выходе получают листы толщиной 1.5–80 мм, двутавровые балки, уголки, швеллеры и арматуру диаметром 8–40 мм." },
      ],
    },
  },
  {
    id: "finished",
    num: "06",
    title: "Готовая продукция",
    short: "Весь спектр стального проката для строительства",
    icon: "Package",
    details: {
      description: "SteelTech выпускает полный ассортимент стального проката для строительства, машиностроения и трубопроводного транспорта.",
      points: [
        { label: "Листовой прокат", text: "Горячекатаные и холоднокатаные листы толщиной от 1.5 до 80 мм. Применяются в судостроении, вагоностроении и промышленном строительстве." },
        { label: "Арматура", text: "Стержневая арматура диаметром 8–40 мм классов А400 и А500. Основной материал для железобетонных конструкций любой сложности." },
        { label: "Металлические балки", text: "Двутавровые балки и швеллеры для несущих конструкций зданий, мостов и промышленных сооружений длиной до 24 метров." },
        { label: "Стальные трубы", text: "Бесшовные и электросварные трубы диаметром 57–530 мм для нефтегазовой отрасли и коммунальной инфраструктуры." },
      ],
    },
  },
];

const aboutItems = [
  { icon: "History", title: "История компании", text: "Основана в 1963 году как государственное предприятие, SteelTech прошла путь от небольшого завода до одного из крупнейших производителей стального проката в стране. Сегодня компания объединяет 4 производственных площадки." },
  { icon: "Settings", title: "Современное оборудование", text: "Инвестиции в модернизацию составили более 12 млрд рублей за последние 5 лет. Установлены новые кислородные конвертеры DANIELI, машины непрерывного литья SMS Group и высокоскоростные прокатные станы." },
  { icon: "BadgeCheck", title: "Контроль качества", text: "Система менеджмента качества сертифицирована по ISO 9001:2015. Каждая партия продукции проходит 47 видов испытаний в собственной аккредитованной лаборатории." },
  { icon: "Leaf", title: "Экологическая ответственность", text: "Программа «Зелёная сталь» предусматривает снижение выбросов CO₂ на 30% к 2030 году. Внедрены системы улавливания пыли эффективностью 99.7% и полный оборот производственных вод." },
];

const navLinks: { key: Section; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "about", label: "О компании" },
  { key: "production", label: "Производство" },
  { key: "products", label: "Продукция" },
  { key: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (section: Section) => {
    setActiveSection(section);
    setExpandedStage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-ibm">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || activeSection !== "home"
            ? "bg-steel-900 shadow-lg"
            : "bg-steel-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="font-oswald text-xl font-bold text-white tracking-widest hover:text-blue-300 transition-colors"
          >
            STEEL<span className="text-blue-400">TECH</span>
          </button>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => navigate(link.key)}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded ${
                  activeSection === link.key
                    ? "bg-blue-500 text-white"
                    : "text-steel-200 hover:text-white hover:bg-steel-700"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ====================== HOME ====================== */}
        {activeSection === "home" && (
          <section className="relative h-screen min-h-[700px] flex items-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-steel-900/95 via-steel-900/75 to-steel-900/30" />

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
                <p className="text-steel-200 text-lg leading-relaxed mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                  Полный цикл металлургического производства — от добычи<br />
                  железной руды до готового стального проката для строительства<br />
                  и промышленности России.
                </p>
                <div className="flex items-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                  <button
                    onClick={() => navigate("production")}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-oswald font-semibold tracking-wider px-8 py-4 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    ПРОИЗВОДСТВЕННЫЙ ЦИКЛ
                  </button>
                  <button
                    onClick={() => navigate("about")}
                    className="border border-steel-400 hover:border-white text-steel-300 hover:text-white font-oswald font-semibold tracking-wider px-8 py-4 text-sm transition-all duration-200"
                  >
                    О КОМПАНИИ
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-steel-400">
              <span className="text-xs tracking-widest">ЛИСТАЙТЕ ВНИЗ</span>
              <Icon name="ChevronDown" size={20} className="animate-bounce" />
            </div>

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
        )}

        {/* ====================== ABOUT ====================== */}
        {activeSection === "about" && (
          <div className="pt-16">
            <div className="relative h-64 overflow-hidden">
              <img src={ROLLING_IMAGE} alt="Производство" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-steel-900/70" />
              <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-6">
                <div>
                  <p className="text-blue-400 text-sm font-oswald tracking-widest mb-2">STEELTECH</p>
                  <h1 className="font-oswald text-5xl font-bold text-white tracking-tight">О КОМПАНИИ</h1>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-2 gap-6 mb-16">
                {aboutItems.map((item) => (
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

              <div className="bg-gradient-to-r from-steel-900 to-steel-800 rounded-xl p-10 text-white">
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="font-oswald text-3xl font-bold mb-4 tracking-wide">НАША МИССИЯ</h2>
                    <p className="text-steel-200 leading-relaxed">
                      Обеспечивать российскую промышленность и строительную отрасль
                      качественным стальным прокатом, применяя передовые технологии
                      и придерживаясь принципов устойчивого развития. Мы создаём металл,
                      из которого строится страна.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { num: "ISO 9001", label: "Сертификат качества" },
                      { num: "№3", label: "В России по объёму" },
                      { num: "99.7%", label: "Очистка выбросов" },
                      { num: "2030", label: "Нулевые выбросы" },
                    ].map((s) => (
                      <div key={s.label} className="bg-steel-700/50 rounded-lg p-4 text-center">
                        <div className="font-oswald text-xl font-bold text-blue-400 mb-1">{s.num}</div>
                        <div className="text-steel-300 text-xs">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================== PRODUCTION ====================== */}
        {activeSection === "production" && (
          <div className="pt-16">
            <div className="relative h-64 overflow-hidden">
              <img src={MINING_IMAGE} alt="Добыча руды" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-steel-900/70" />
              <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-6">
                <div>
                  <p className="text-blue-400 text-sm font-oswald tracking-widest mb-2">STEELTECH</p>
                  <h1 className="font-oswald text-5xl font-bold text-white tracking-tight">ПРОИЗВОДСТВЕННЫЙ ЦИКЛ</h1>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-steel-200 flex-1" />
                <p className="text-steel-500 text-sm tracking-widest font-oswald">6 ЭТАПОВ — ОТ РУДЫ ДО ПРОКАТА</p>
                <div className="h-px bg-steel-200 flex-1" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {productionStages.map((stage) => (
                  <div
                    key={stage.id}
                    className={`group border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      expandedStage === stage.id
                        ? "border-blue-400 shadow-lg shadow-blue-100"
                        : "border-steel-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                  >
                    <div className="bg-gradient-to-br from-steel-800 to-steel-900 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-oswald text-4xl font-bold text-steel-600">{stage.num}</span>
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Icon name={stage.icon as AnyIcon} size={20} className="text-blue-400" />
                        </div>
                      </div>
                      <h3 className="font-oswald text-lg font-semibold text-white mb-2 tracking-wide">{stage.title}</h3>
                      <p className="text-steel-400 text-xs leading-relaxed">{stage.short}</p>
                    </div>
                    <div className={`px-6 py-3 flex items-center justify-between transition-colors ${
                      expandedStage === stage.id ? "bg-blue-50" : "bg-white"
                    }`}>
                      <span className="text-blue-500 text-sm font-medium">
                        {expandedStage === stage.id ? "Скрыть" : "Подробнее"}
                      </span>
                      <Icon
                        name={expandedStage === stage.id ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        className="text-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {expandedStage && (() => {
                const stage = productionStages.find((s) => s.id === expandedStage);
                if (!stage) return null;
                return (
                  <div className="border-2 border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-white p-8 animate-fade-in">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={stage.icon as AnyIcon} size={26} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-oswald text-blue-400 font-bold text-lg">{stage.num}</span>
                          <h3 className="font-oswald text-2xl font-bold text-steel-900 tracking-wide">{stage.title}</h3>
                        </div>
                        <p className="text-steel-600 mb-6 leading-relaxed">{stage.details.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          {stage.details.points.map((point) => (
                            <div key={point.label} className="bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                                <span className="font-semibold text-steel-800 text-sm">{point.label}</span>
                              </div>
                              <p className="text-steel-600 text-sm leading-relaxed">{point.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ====================== PRODUCTS ====================== */}
        {activeSection === "products" && (
          <div className="pt-16">
            <div className="relative h-64 overflow-hidden">
              <img src={ROLLING_IMAGE} alt="Прокат" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-steel-900/70" />
              <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-6">
                <div>
                  <p className="text-blue-400 text-sm font-oswald tracking-widest mb-2">STEELTECH</p>
                  <h1 className="font-oswald text-5xl font-bold text-white tracking-tight">ПРОДУКЦИЯ</h1>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: "Square",
                    title: "Листовой прокат",
                    specs: ["Толщина: 1.5 — 80 мм", "Ширина: до 2350 мм", "Длина: до 12 000 мм"],
                    desc: "Горячекатаные и холоднокатаные листы для судостроения, вагоностроения, строительных металлоконструкций и промышленного оборудования.",
                    badge: "Хит продаж",
                  },
                  {
                    icon: "AlignJustify",
                    title: "Арматура",
                    specs: ["Диаметр: 8 — 40 мм", "Классы: А400, А500С", "Длина: 6, 9, 12 м"],
                    desc: "Стержневая арматура периодического профиля — основной материал для армирования железобетонных конструкций любого назначения.",
                    badge: "Строительный",
                  },
                  {
                    icon: "Minus",
                    title: "Металлические балки",
                    specs: ["Двутавр: №10 — №60", "Швеллер: №5 — №40У", "Длина: 6 — 24 м"],
                    desc: "Двутавровые балки и швеллеры для несущих конструкций промышленных зданий, мостовых сооружений и каркасного строительства.",
                    badge: "Промышленное",
                  },
                  {
                    icon: "Circle",
                    title: "Стальные трубы",
                    specs: ["Диаметр: 57 — 530 мм", "Стенка: 3.5 — 20 мм", "Длина: 6 — 12 м"],
                    desc: "Бесшовные и электросварные трубы для нефтегазовой отрасли, тепловых и водопроводных сетей, машиностроительного производства.",
                    badge: "Нефтегазовый",
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
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
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
                        onClick={() => navigate("contacts")}
                        className="w-full bg-steel-900 hover:bg-blue-600 text-white font-oswald font-semibold tracking-wider text-sm py-3 rounded-lg transition-all duration-200"
                      >
                        ЗАПРОСИТЬ ЦЕНУ
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
                <h2 className="font-oswald text-3xl font-bold mb-3 tracking-wide">ИЗГОТОВИМ ПО ВАШИМ РАЗМЕРАМ</h2>
                <p className="text-blue-100 mb-6">Нестандартные размеры, специальные марки стали, термообработка — обсудим любой запрос</p>
                <button
                  onClick={() => navigate("contacts")}
                  className="bg-white text-blue-700 font-oswald font-bold tracking-wider px-10 py-3 hover:bg-blue-50 transition-colors"
                >
                  СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================== CONTACTS ====================== */}
        {activeSection === "contacts" && (
          <div className="pt-16">
            <div className="bg-gradient-to-br from-steel-900 to-steel-800 pt-16 pb-20 px-6">
              <div className="max-w-7xl mx-auto">
                <p className="text-blue-400 text-sm font-oswald tracking-widest mb-2">STEELTECH</p>
                <h1 className="font-oswald text-5xl font-bold text-white tracking-tight">КОНТАКТЫ</h1>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-8">
              <div className="grid grid-cols-3 gap-6 mb-12">
                {[
                  { icon: "MapPin", label: "Адрес", value: "300026, г. Тула, ул. Металлургов, д. 1" },
                  { icon: "Phone", label: "Телефон", value: "+7 (4872) 55-00-10" },
                  { icon: "Mail", label: "Email", value: "info@steeltech-tula.ru" },
                ].map((contact) => (
                  <div key={contact.label} className="bg-white rounded-xl border border-steel-200 p-6 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon as AnyIcon} size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-steel-500 text-xs font-medium tracking-wide mb-1">{contact.label}</p>
                      <p className="text-steel-900 font-semibold">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-10 mb-16">
                <div>
                  <h2 className="font-oswald text-2xl font-bold text-steel-900 mb-6 tracking-wide">ОТПРАВИТЬ ЗАПРОС</h2>
                  {formSent ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="CheckCircle" size={28} className="text-green-600" />
                      </div>
                      <h3 className="font-oswald text-xl font-bold text-green-800 mb-2">Заявка отправлена!</h3>
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
                  <h2 className="font-oswald text-2xl font-bold text-steel-900 mb-6 tracking-wide">РЕЖИМ РАБОТЫ</h2>
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
                    <h3 className="font-oswald text-lg font-semibold text-steel-900 mb-3 tracking-wide">ОТДЕЛ ПРОДАЖ</h3>
                    <div className="space-y-2">
                      <p className="text-steel-600 text-sm flex items-center gap-2">
                        <Icon name="Phone" size={14} className="text-blue-500" />
                        +7 (4872) 55-00-11 — Металлопрокат
                      </p>
                      <p className="text-steel-600 text-sm flex items-center gap-2">
                        <Icon name="Phone" size={14} className="text-blue-500" />
                        +7 (4872) 55-00-12 — Трубная продукция
                      </p>
                      <p className="text-steel-600 text-sm flex items-center gap-2">
                        <Icon name="Mail" size={14} className="text-blue-500" />
                        sales@steeltech-tula.ru
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-steel-900 text-steel-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <span className="font-oswald text-lg font-bold text-white tracking-widest">
              STEEL<span className="text-blue-400">TECH</span>
            </span>
            <p className="text-steel-500 text-xs mt-1">© 2024 ООО «СтилТех». Все права защищены.</p>
          </div>
          <div className="flex items-center gap-6">
            {navLinks.slice(1).map((link) => (
              <button
                key={link.key}
                onClick={() => navigate(link.key)}
                className="text-steel-400 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}