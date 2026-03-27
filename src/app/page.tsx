import { getSiteData } from '@/lib/cms';

export default async function HomePage() {
  const { settings, services, testimonials, team } = await getSiteData();

  return (
    <div>
      {/* HERO — replace with your design */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold">{settings.heroTitle || settings.siteTitle}</h1>
        {settings.heroSubtitle && (
          <p className="mt-4 text-lg text-gray-600">{settings.heroSubtitle}</p>
        )}
        {settings.ctaText && settings.ctaUrl && (
          <a href={settings.ctaUrl} className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">
            {settings.ctaText}
          </a>
        )}
      </section>

      {/* SERVICES — replace with your design */}
      {services.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.id} className="p-6 border rounded-xl">
                {s.icon && <div className="text-3xl mb-3">{s.icon}</div>}
                <h3 className="font-bold text-lg">{s.title}</h3>
                {s.description && <p className="mt-2 text-gray-600">{s.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS — replace with your design */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 bg-white rounded-xl shadow-sm">
                <p className="text-gray-700">"{t.content}"</p>
                <div className="mt-4 font-bold">{t.clientName}</div>
                {t.clientRole && <div className="text-sm text-gray-500">{t.clientRole}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TEAM — replace with your design */}
      {team.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((m) => (
              <div key={m.id} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3" />
                <div className="font-bold">{m.name}</div>
                {m.role && <div className="text-sm text-gray-500">{m.role}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
