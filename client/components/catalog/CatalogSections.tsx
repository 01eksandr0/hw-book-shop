import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookCover from "@/components/book/BookCover";
import {
  ALL_CATALOG_BOOKS,
  CATALOG_PER_PAGE,
  type CatalogBook,
} from "@/data/catalogBooks";

const HERO_IMAGE =
  "https://api.builder.io/api/v1/image/assets/TEMP/5b0e859f1dbe985dd481a698f3646e94601217d9?width=2880";

type SortKey = "new" | "old" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "new", label: "Спочатку нові" },
  { value: "old", label: "Спочатку старіші" },
  { value: "price-asc", label: "Спочатку дешевші" },
  { value: "price-desc", label: "Спочатку дорожчі" },
];

const PER_PAGE = CATALOG_PER_PAGE;
const ALL_BOOKS: CatalogBook[] = ALL_CATALOG_BOOKS;

function formatPrice(n: number) {
  return `${n} грн`;
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function paginationItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 1) return [1];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: (number | "ellipsis")[] = [];
  const push = (x: number | "ellipsis") => {
    if (items.length && items[items.length - 1] === "ellipsis" && x === "ellipsis") return;
    items.push(x);
  };

  push(1);

  let left: number;
  let right: number;
  if (current <= 2) {
    left = 2;
    right = 3;
  } else if (current >= total - 1) {
    left = total - 2;
    right = total - 1;
  } else {
    left = current - 1;
    right = current + 1;
  }
  left = Math.max(2, left);
  right = Math.min(total - 1, right);

  if (left > 2) push("ellipsis");
  for (let p = left; p <= right; p++) {
    if (p !== 1 && p !== total) push(p);
  }
  if (right < total - 1) push("ellipsis");

  push(total);

  return items;
}

type CatalogFiltersCtx = {
  query: string;
  setQuery: (q: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
};

const CatalogFiltersContext = createContext<CatalogFiltersCtx | null>(null);

function useCatalogFilters() {
  const ctx = useContext(CatalogFiltersContext);
  if (!ctx) throw new Error("useCatalogFilters outside provider");
  return ctx;
}

function CatalogHeroSection() {
  const { query, setQuery, sort, setSort } = useCatalogFilters();

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-white">
      <div className="absolute inset-0">
        <img alt="" className="h-full w-full scale-105 object-cover blur-[1px]" src={HERO_IMAGE} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-900/25 to-slate-950/40" />
      </div>

      <div className="relative">
        <SiteHeader />
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="max-w-[46rem]">
            <h1 className="max-w-[46rem] text-[clamp(2.2rem,4.3vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:leading-[1.02]">
              Знайди книгу, що змінить твій день. А може, і життя.
            </h1>
            <p className="mt-6 max-w-[32.5rem] text-[clamp(1rem,1.5vw,1.1875rem)] leading-8 text-white/90">
              Тисячі історій, ідей та світів — у кілька кліків від тебе. Новинки, бестселери, українські видання та рідкісні екземпляри — усе в одному місці.
            </p>
          </div>

          <div className="mt-10 flex w-full max-w-3xl flex-col gap-3 sm:max-w-none sm:flex-row sm:items-stretch lg:max-w-4xl">
            <label className="relative flex min-h-[48px] flex-1 items-center">
              <Search className="pointer-events-none absolute left-3.5 h-5 w-5 text-white/70" strokeWidth={1.8} />
              <span className="sr-only">Пошук за назвою або автором</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 w-full rounded-[0.65rem] border border-white/55 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/60 backdrop-blur-sm focus:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/25"
                placeholder="Пошук за назвою або автором"
                type="search"
              />
            </label>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-12 w-full shrink-0 rounded-[0.65rem] border-white/55 bg-white/10 text-left text-sm text-white backdrop-blur-sm focus:ring-2 focus:ring-white/25 data-[placeholder]:text-white/65 sm:w-[min(100%,220px)] [&>svg]:text-white/80">
                <SelectValue placeholder="Сортування" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}

function CatalogGridSection() {
  const { query, sort } = useCatalogFilters();
  const [page, setPage] = useState(1);

  const filteredSorted = useMemo(() => {
    const q = normalize(query);
    let list = ALL_BOOKS.filter(
      (b) => !q || normalize(b.title).includes(q) || normalize(b.author).includes(q),
    );

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "new":
          return b.id - a.id;
        case "old":
          return a.id - b.id;
        case "price-asc":
          return a.priceUah - b.priceUah;
        case "price-desc":
          return b.priceUah - a.priceUah;
        default:
          return 0;
      }
    });

    return list;
  }, [query, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PER_PAGE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [query, sort]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredSorted.slice(start, start + PER_PAGE);
  }, [filteredSorted, page]);

  const visiblePages = paginationItems(page, totalPages);

  return (
    <section className="py-14 sm:py-20" id="catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 className="text-[clamp(1.9rem,2.6vw,2.5rem)] font-extrabold tracking-[-0.03em] text-brand-ink">Каталог товарів</h2>
        <p className="mt-2 text-sm text-brand-brown/80">
          Знайдено: {filteredSorted.length}{" "}
          {filteredSorted.length === 1 ? "книга" : filteredSorted.length < 5 ? "книги" : "книг"}
        </p>

        {pageItems.length === 0 ? (
          <p className="mt-12 text-center text-base text-brand-brown/80">Нічого не знайдено. Спробуйте змінити запит.</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((book) => (
              <article
                key={book.id}
                className="flex h-full flex-col border border-brand-latte bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="p-4 pb-3">
                  <div className="aspect-[182/175] overflow-hidden bg-brand-sand">
                    <BookCover
                      alt={`Обкладинка «${book.title}»`}
                      className="h-full w-full object-cover"
                      index={book.id}
                      src={book.image}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4">
                  <h3 className="text-[1rem] font-bold text-brand-ink">“{book.title}”</h3>
                  <p className="mt-1 text-xs text-brand-brown/75">{book.author}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-brand-ink">{formatPrice(book.priceUah)}</span>
                    <button
                      className="rounded-md bg-brand-peach px-4 py-1.5 text-sm font-medium text-brand-ink transition hover:bg-[#ffb16a]"
                      type="button"
                    >
                      Купити
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
            aria-label="Сторінки каталогу"
          >
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-brand-orange text-brand-orange transition hover:bg-brand-orange/10 disabled:pointer-events-none disabled:opacity-35"
              aria-label="Попередня сторінка"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {visiblePages.map((item, i) =>
              item === "ellipsis" ? (
                <span key={`e-${i}`} className="px-1 text-sm font-medium text-brand-orange">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={`min-w-[2.5rem] rounded-md border-2 px-3 py-2 text-sm font-semibold transition ${
                    page === item
                      ? "border-brand-orange bg-brand-orange text-white"
                      : "border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                  }`}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-brand-orange text-brand-orange transition hover:bg-brand-orange/10 disabled:pointer-events-none disabled:opacity-35"
              aria-label="Наступна сторінка"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

export default function CatalogSections() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("new");

  return (
    <CatalogFiltersContext.Provider value={{ query, setQuery, sort, setSort }}>
      <main className="bg-brand-cream text-brand-ink">
        <CatalogHeroSection />
        <CatalogGridSection />
        <SiteFooter />
      </main>
    </CatalogFiltersContext.Provider>
  );
}
