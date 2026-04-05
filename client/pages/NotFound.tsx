import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4 text-brand-ink">
      <div className="max-w-md rounded-[1.5rem] border border-brand-latte bg-white p-8 text-center shadow-[0_12px_40px_rgba(108,45,44,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-brown/70">
          Читаріум
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em]">404</h1>
        <p className="mt-3 text-base text-brand-ink/75">Сторінку не знайдено.</p>
        <Link
          className="mt-6 inline-flex items-center justify-center rounded-[0.75rem] bg-brand-peach px-5 py-3 text-sm font-medium text-brand-ink transition hover:bg-[#ffb16a]"
          to="/"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
