import { lazy, Suspense, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

const StoresMap = lazy(() => import("@/components/map/StoresMap"));

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-[clamp(1.9rem,2.6vw,2.5rem)] font-extrabold tracking-[-0.03em] text-brand-ink">{children}</h2>
  );
}

const newsItems = [
  {
    text: "Відкриття нового магазину на вулиці Велика Васильківська вже цієї суботи. Ви зможете побачити неймовірну виставку найновіших книг.",
    date: "20.09.2025",
    author: "Адміністрація",
  },
  {
    text: "Читаріум запускає програму обміну прочитаних книг: приносьте улюблені видання та знаходьте нові історії за спеціальними цінами.",
    date: "12.09.2025",
    author: "Адміністрація",
  },
  {
    text: "Новий розділ на сайті — рідкісні та колекційні примірники. Підписуйтесь на оновлення, щоб не пропустити унікальні лоти.",
    date: "01.09.2025",
    author: "Редакція",
  },
];

const faqItems = [
  {
    q: "Як оформити замовлення?",
    a: "Оберіть книгу, додайте її до кошика та заповніть коротку форму оформлення замовлення. Увесь процес займає лише кілька хвилин.",
  },
  {
    q: "Які способи оплати ви приймаєте?",
    a: "Ми приймаємо оплату карткою онлайн, Apple Pay / Google Pay, а також накладений платіж у відділеннях партнерських служб доставки.",
  },
  {
    q: "Як швидко доставляєте замовлення?",
    a: "По Києву — від 1 дня, по Україні — зазвичай 2–5 робочих днів залежно від регіону та обраного перевізника.",
  },
  {
    q: "Чи можна повернути або обміняти книгу?",
    a: "Так, згідно з законом про захист прав споживачів ви можете повернути товар належної якості протягом 14 днів, якщо збережено товарний вигляд.",
  },
  {
    q: "Де знаходяться ваші магазини?",
    a: "Мережа представлена в багатьох містах України. Актуальні адреси та години роботи дивіться в розділі «Карта магазинів» нижче.",
  },
  {
    q: "Як зв’язатися з підтримкою?",
    a: "Пишіть на literature@liter.com або телефонуйте за номером, вказаним у футері сайту — ми на зв’язку щодня з 9:00 до 21:00.",
  },
];

function AboutHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-white">
      <div className="absolute inset-0">
        <img
          alt=""
          className="h-full min-h-[320px] w-full object-cover object-[20%_center] sm:object-center"
          src="/w816h301-2d37d4a5.jpg"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/40" />
      </div>

      <div className="relative">
        <SiteHeader />
        <div className="mx-auto flex min-h-[min(72vh,560px)] w-full max-w-7xl items-center px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-10 lg:px-10 lg:pb-28 lg:pt-14">
          <div className="max-w-[46rem]">
            <h1 className="max-w-[46rem] text-[clamp(1.85rem,3.8vw,3.25rem)] font-extrabold leading-[1.12] tracking-[-0.04em] text-white sm:leading-[1.08]">
              «Читаріум» — інтернет-магазин, створений людьми, які щиро закохані в книги.
            </h1>
            <p className="mt-7 max-w-[40rem] text-[clamp(1rem,1.45vw,1.125rem)] leading-8 text-white/92">
              У нас — тисячі історій, жанрів і цілих всесвітів: від бестселерів до маловідомих перлин, від дитячих казок до наукової прози. Ми поєднуємо
              сучасні технології зі справжньою любов’ю до друкованого слова, щоб кожен читач знайшов саме «свою» книгу — швидко, зручно й із теплом,
              якого так не вистачає в безликих коридорах великих маркетплейсів.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutNewsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.75, 420);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <SectionTitle>Новини</SectionTitle>
          <div className="hidden items-center gap-3 md:flex">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-latte bg-white text-brand-latte shadow-sm transition hover:bg-brand-sand"
              type="button"
              aria-label="Попередні новини"
              onClick={() => scrollByDir(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-peach text-brand-ink shadow-sm transition hover:bg-[#ffb16a]"
              type="button"
              aria-label="Наступні новини"
              onClick={() => scrollByDir(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {newsItems.map((item, index) => (
            <article
              key={`${item.date}-${index}`}
              className="flex min-h-[180px] w-[min(100%,calc(100vw-2rem))] shrink-0 snap-start flex-col border border-brand-brown/50 bg-white p-5 shadow-[0_0_2px_rgba(0,0,0,0.12)] sm:w-[min(100%,calc(50%-0.625rem))] lg:w-[min(100%,calc(50%-0.625rem))]"
            >
              <p className="text-[0.85rem] italic leading-6 text-brand-ink">{item.text}</p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-5 text-sm">
                <span className="text-brand-brown/60">{item.date}</span>
                <span className="font-bold text-brand-ink">{item.author}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            className="inline-flex items-center gap-3 rounded-[0.75rem] bg-brand-peach px-6 py-3 text-sm font-medium text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 hover:bg-[#ffb16a]"
            to="/catalog"
          >
            Переглянути більше
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle>Питання які часто цікавлять</SectionTitle>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q}
                className="border border-brand-brown/50 bg-white shadow-[0_0_2px_rgba(0,0,0,0.12)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-sand/40"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="text-base font-bold text-brand-ink">{item.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-latte bg-white text-brand-ink">
                    {open ? <X className="h-4 w-4" strokeWidth={2} /> : <Plus className="h-4 w-4" strokeWidth={2} />}
                  </span>
                </button>
                {open ? (
                  <div className="border-t border-brand-latte/80 px-5 pb-5 pt-0">
                    <p className="pt-4 text-[0.95rem] leading-7 text-brand-ink/90">{item.a}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutMapSection() {
  return (
    <section className="bg-white py-16 sm:py-20" id="stores-map">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle>Карта магазинів</SectionTitle>
        <div className="mt-10 overflow-hidden rounded-[1rem] border border-brand-latte bg-brand-sand/30 shadow-[0_12px_40px_rgba(108,45,44,0.06)]">
          <Suspense
            fallback={
              <div className="flex h-[min(58vh,480px)] min-h-[300px] w-full items-center justify-center text-sm text-brand-ink/55 sm:h-[min(62vh,520px)]">
                Завантаження карти…
              </div>
            }
          >
            <StoresMap />
          </Suspense>
        </div>
        <p className="mt-3 text-center text-xs text-brand-ink/50">
          Тайли © OpenStreetMap contributors · адреси демонстраційні
        </p>
      </div>
    </section>
  );
}

export default function AboutSections() {
  return (
    <main className="bg-brand-cream text-brand-ink">
      <AboutHeroSection />
      <AboutNewsSection />
      <AboutFaqSection />
      <AboutMapSection />
      <SiteFooter />
    </main>
  );
}
