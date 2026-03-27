import Link from 'next/link';
import { SiteData, getMenuBySlug, cmsImageUrl } from '@/lib/cms';

// TODO: Replace this placeholder with your client's header design.
export default function Header({ siteData }: { siteData: SiteData }) {
  const { settings, menus } = siteData;
  const nav = getMenuBySlug(menus, 'main-nav');

  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">
        {settings.logoUrl
          ? <img src={cmsImageUrl(settings.logoUrl)} alt={settings.siteTitle} className="h-8" />
          : settings.siteTitle}
      </Link>
      {nav && (
        <nav className="flex gap-6 text-sm">
          {nav.items.map((item) => (
            <Link key={item.url} href={item.url} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
