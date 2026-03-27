import Link from 'next/link';
import { SiteData, getMenuBySlug } from '@/lib/cms';

// TODO: Replace this placeholder with your client's footer design.
export default function Footer({ siteData }: { siteData: SiteData }) {
  const { settings, menus } = siteData;
  const footer = getMenuBySlug(menus, 'footer');

  return (
    <footer className="border-t px-6 py-8 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span>{settings.copyrightText || `© ${new Date().getFullYear()} ${settings.siteTitle}`}</span>
        {footer && (
          <nav className="flex gap-4">
            {footer.items.map((item) => (
              <Link key={item.url} href={item.url} className="hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
