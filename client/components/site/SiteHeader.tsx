import { Link, useLocation } from "react-router-dom";
import { BookOpenText, Search, ShoppingCart } from "lucide-react";

const navItems = [
  { label: "Головна", to: "/" },
  { label: "Каталог товарів", to: "/catalog" },
  { label: "Про нас", to: "/about" },
];

function navLinkActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to;
}

export default function SiteHeader() {
  const { pathname } = useLocation();

  return (
    <header className="relative z-20">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10 lg:py-5">
        <Link to="/" className="flex items-center gap-2 text-brand-peach transition-opacity hover:opacity-90">
          <BookOpenText className="h-8 w-8" strokeWidth={1.8} />
          <span className="text-[1.25rem] font-semibold tracking-tight">Читаріум</span>
        </Link>

        <label className="hidden min-w-0 max-w-[210px] flex-1 items-center gap-2 rounded-sm border border-white/45 bg-white/10 px-3 py-2 text-sm text-white/80 backdrop-blur-sm md:flex">
          <Search className="h-4 w-4 shrink-0" strokeWidth={1.8} />
          <span className="sr-only">Пошук</span>
          <input
            className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
            placeholder="Пошук"
            type="search"
          />
        </label>

        <nav className="flex items-center gap-4 text-sm text-white/95 sm:gap-6">
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item, index) => (
              <div key={item.label} className="flex items-center gap-5">
                <Link
                  className={`transition-colors hover:text-brand-peach ${navLinkActive(pathname, item.to) ? "text-brand-peach" : ""}`}
                  to={item.to}
                >
                  {item.label}
                </Link>
                {index < navItems.length - 1 ? (
                  <span className="text-white/50">|</span>
                ) : null}
              </div>
            ))}
          </div>

          <button
            aria-label="Кошик"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            type="button"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.9} />
          </button>
        </nav>
      </div>
    </header>
  );
}
