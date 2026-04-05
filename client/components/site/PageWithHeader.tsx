import SiteHeader from "./SiteHeader";

export default function PageWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative isolate bg-brand-ink text-white">
        <SiteHeader />
      </div>
      {children}
    </>
  );
}
