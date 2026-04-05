import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Send, BookOpenText } from "lucide-react";

const footerLinks = [
  { label: "Головна", to: "/" },
  { label: "Каталог товарів", to: "/catalog" },
  { label: "Про нас", to: "/about" },
];

const categories = ["Романи", "Бестселери", "Фентезі", "Книги англійською"];

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-latte bg-brand-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_1fr_1fr] lg:px-10 lg:py-16">
        <div>
          <Link to="/" className="flex items-center gap-2 text-brand-brown">
            <BookOpenText className="h-8 w-8 text-brand-brown" strokeWidth={1.8} />
            <span className="text-[1.25rem] font-medium tracking-tight">Читаріум</span>
          </Link>

          <ul className="mt-6 space-y-3 text-sm font-medium text-brand-brown/90">
            {footerLinks.map((item) => (
              <li key={item.label}>
                <Link className="transition-colors hover:text-brand-orange" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-brand-ink">Часто шукають</h2>
          <ul className="mt-6 space-y-3 text-sm font-medium text-brand-ink">
            {categories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-brand-ink">Контакти</h2>
          <div className="mt-6 space-y-3 text-sm text-brand-ink">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brand-brown" />
              <span>Всі магазини тут</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brand-brown" />
              <span>+38 (099) 99 999 99</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brand-brown" />
              <a className="underline underline-offset-2 transition-colors hover:text-brand-orange" href="mailto:literature@liter.com">
                literature@liter.com
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-brand-brown">
            <a aria-label="Instagram" className="transition-colors hover:text-brand-orange" href="https://instagram.com" rel="noreferrer" target="_blank">
              <Instagram className="h-5 w-5" />
            </a>
            <a aria-label="Telegram" className="transition-colors hover:text-brand-orange" href="https://telegram.org" rel="noreferrer" target="_blank">
              <Send className="h-5 w-5" />
            </a>
            <a aria-label="Facebook" className="transition-colors hover:text-brand-orange" href="https://facebook.com" rel="noreferrer" target="_blank">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
