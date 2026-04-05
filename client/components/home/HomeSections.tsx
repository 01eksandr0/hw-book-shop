import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import BookCover from "@/components/book/BookCover";
import { ALL_CATALOG_BOOKS } from "@/data/catalogBooks";
import { NETWORK_STATS } from "@/data/storeLocations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const stats = [
  { value: String(NETWORK_STATS.storeCount), label: "Магазин" },
  { value: String(NETWORK_STATS.cityCount), label: "Міст" },
  { value: "3000", label: "Замовлень щодня" },
  { value: "16", label: "Років" },
];

const books = ALL_CATALOG_BOOKS.slice(0, 12).map((b) => ({
  title: b.title,
  price: `${b.priceUah} грн`,
  image: b.image,
}));

const reviews = [
  {
    text:
      "«Замовляла тут уже кілька разів — усе на найвищому рівні! Книги приходять швидко, запаковані з любов’ю, ще й із закладкою всередині ❤️ Дуже приємно, що підтримують українських авторів. Тепер купую тільки тут!»",
    date: "20.09.2025",
    author: "Степаненко О.Ю.",
  },
  {
    text:
      "«Швидка доставка до Львова, стан книг як новий. Особливо подобається фільтр за мовою та наявністю — економить час. Рекомендую всім, хто любить паперові книги.»",
    date: "03.10.2025",
    author: "Мельник І.П.",
  },
  {
    text:
      "«Продав свою колекцію детективів через програму обміну — чесна оцінка, зручна комунікація. Приємно, що книги не потрапляють на смітник, а йдуть далі в обіг.»",
    date: "15.10.2025",
    author: "Кравченко Д.В.",
  },
  {
    text:
      "«Перше замовлення — подарунок для мами. Підібрала українську класику, усе прийшло акуратно в коробці. Підтримка відповіла за годину. Дякую!»",
    date: "01.11.2025",
    author: "Бондар А.М.",
  },
  {
    text:
      "«Читаю англійською оригінали — асортимент приємно здивував. Ціни адекватні, можна знайти рідкіші видання без полювання по барахолках.»",
    date: "22.11.2025",
    author: "Гордієнко Є.С.",
  },
];

function CarouselNavButtons({ api }: { api: CarouselApi | undefined }) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        aria-label="Попередній слайд"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-latte bg-white text-brand-latte shadow-sm transition hover:bg-brand-sand disabled:pointer-events-none disabled:opacity-35"
        disabled={!canPrev}
        onClick={() => api?.scrollPrev()}
        type="button"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Наступний слайд"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-peach text-brand-ink shadow-sm transition hover:bg-[#ffb16a] disabled:pointer-events-none disabled:opacity-35"
        disabled={!canNext}
        onClick={() => api?.scrollNext()}
        type="button"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function SectionButton({ children }: { children: string }) {
  return (
    <Link
      className="inline-flex items-center gap-3 rounded-[0.75rem] bg-brand-peach px-6 py-3 text-sm font-medium text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 hover:bg-[#ffb16a]"
      to="/catalog"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-white">
      <div className="absolute inset-0">
        <img
          alt="Background books collage"
          className="h-full w-full object-cover blur-[1px] scale-105"
          src="https://api.builder.io/api/v1/image/assets/TEMP/5b0e859f1dbe985dd481a698f3646e94601217d9?width=2880"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
      </div>

      <div className="relative">
        <SiteHeader />
        <div className="mx-auto flex min-h-[470px] w-full max-w-7xl items-center px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="max-w-[46rem]">
            <h1 className="max-w-[46rem] text-[clamp(2.2rem,4.3vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:leading-[1.02]">
              Знайди книгу, що змінить твій день. А може, і життя.
            </h1>
            <p className="mt-6 max-w-[32.5rem] text-[clamp(1rem,1.5vw,1.1875rem)] leading-8 text-white/90">
              Тисячі історій, ідей та світів — у кілька кліків від тебе. Новинки, бестселери, українські видання та рідкісні екземпляри — усе в одному місці.
            </p>
            <div className="mt-8">
              <SectionButton>Переглянути книги</SectionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative z-10 -mt-6">
      <div className="bg-[#FDFBF8]">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 ? (
                  <div
                    aria-hidden
                    className="hidden h-[4.5rem] w-px shrink-0 bg-black sm:block"
                  />
                ) : null}
                <div className="flex w-full flex-1 flex-col items-center justify-center gap-1.5 px-4 text-center sm:min-w-0 sm:max-w-none sm:px-6 lg:px-10">
                  <span className="text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-tight text-[#FFC08C]">
                    {stat.value}
                  </span>
                  <span className="text-[0.9375rem] font-normal leading-snug text-black sm:text-base">
                    {stat.label}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-[clamp(1.9rem,2.6vw,2.5rem)] font-extrabold tracking-[-0.03em] text-brand-ink">{children}</h2>;
}

export function EditorialSection({ sectionTitle = "Добірка редакції" }: { sectionTitle?: string }) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-16 sm:py-20" id="catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <SectionTitle>{sectionTitle}</SectionTitle>
          </div>
          <CarouselNavButtons api={api} />
        </div>

        <Carousel
          className="mt-10"
          opts={{ align: "start", containScroll: "trimSnaps", dragFree: false }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-5">
            {books.map((book, index) => (
              <CarouselItem
                key={`${book.title}-${index}`}
                className="min-w-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <article className="flex h-full flex-col border border-brand-brown/50 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)]">
                  <div className="p-4 pb-3">
                    <div className="aspect-[182/175] overflow-hidden bg-brand-sand">
                      <BookCover alt={book.title} className="h-full w-full object-cover" index={index} src={book.image} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <h3 className="text-[1rem] font-bold text-brand-ink">“{book.title}”</h3>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-brand-brown">{book.price}</span>
                      <button className="rounded-md bg-brand-peach px-4 py-1.5 text-sm font-medium text-brand-ink transition hover:bg-[#ffb16a]" type="button">
                        Купити
                      </button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-10 flex justify-center">
          <Link className="inline-flex items-center gap-3 rounded-[0.75rem] bg-brand-peach px-6 py-3 text-sm font-medium text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 hover:bg-[#ffb16a]" to="/catalog">
            Переглянути більше
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="py-2 sm:py-6" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid overflow-hidden rounded-[1.5rem] border border-brand-latte bg-white shadow-[0_12px_40px_rgba(108,45,44,0.08)] lg:grid-cols-2">
          <div className="min-h-[280px] lg:min-h-[530px]">
            <img
              alt="Stack of books in a store"
              className="h-full w-full object-cover"
              src="https://api.builder.io/api/v1/image/assets/TEMP/6765684e4fa2e84ea7e460d3d45879238b0c790f?width=1440"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#f7ede0] px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <h2 className="max-w-[30rem] text-[clamp(1.9rem,2.6vw,2.5rem)] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink">
              Ми даємо книгам шанс на нову історію
            </h2>
            <div className="mt-7 space-y-5 text-[1rem] leading-7 text-brand-ink/90">
              <p>
                Замість того, щоб опинитись у смітті, вони проходять свій другий шлях — до рук тих, хто справді любить читати. Кожна книга, яку ми приймаємо, — це частинка чиїхось спогадів, емоцій і натхнення. Тепер вона може надихнути когось іншого.
              </p>
              <p>
                Ми віримо, що турбота про планету починається з простих речей — таких, як друге життя для книжок. Бо справжня цінність не зникає, вона просто знаходить нового читача.
              </p>
              <p>
                Приєднуйтесь до нашої програми та дайте книгам шанс на нову історію — натисніть кнопку нижче та станьте частиною змін!
              </p>
            </div>
            <div className="mt-8">
              <Link className="inline-flex items-center gap-3 rounded-[0.75rem] bg-brand-peach px-6 py-3 text-sm font-medium text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 hover:bg-[#ffb16a]" to="/catalog">
                Долучитися до програми
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <SectionTitle>Відгуки клієнтів</SectionTitle>
          </div>
          <CarouselNavButtons api={api} />
        </div>

        <Carousel
          className="mt-10"
          opts={{ align: "start", containScroll: "trimSnaps", dragFree: false }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-5">
            {reviews.map((review, index) => (
              <CarouselItem
                key={`${review.author}-${index}`}
                className="min-w-0 basis-full pl-5 lg:basis-1/2"
              >
                <article className="flex min-h-[154px] flex-col border border-brand-brown/50 bg-white p-5 shadow-[0_0_2px_rgba(0,0,0,0.18)]">
                  <p className="text-[0.85rem] italic leading-6 text-brand-ink">
                    {review.text}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-5 text-sm">
                    <span className="text-brand-brown/70">{review.date}</span>
                    <span className="font-bold text-brand-ink">{review.author}</span>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-10 flex justify-center">
          <Link className="inline-flex items-center gap-3 rounded-[0.75rem] bg-brand-peach px-6 py-3 text-sm font-medium text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 hover:bg-[#ffb16a]" to="/catalog">
            Переглянути більше
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <main className="bg-brand-cream text-brand-ink">
      <HeroSection />
      <StatsSection />
      <EditorialSection />
      <MissionSection />
      <ReviewsSection />
      <SiteFooter />
    </main>
  );
}
