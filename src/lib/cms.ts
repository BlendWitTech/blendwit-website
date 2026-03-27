const BASE_URL = process.env.CMS_API_URL || 'http://localhost:3001';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
  [key: string]: string | undefined;
}

export interface SiteSettings {
  siteTitle?: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgImage?: string;
  aboutTitle?: string;
  aboutContent?: string;
  aboutImage?: string;
  ctaText?: string;
  ctaUrl?: string;
  primaryColor?: string;
  logoUrl?: string;
  faviconUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: SocialLinks;
  activeTheme?: string;
  copyrightText?: string;
  footerText?: string;
  [key: string]: unknown;
}

export interface MenuItem {
  id?: string;
  label: string;
  url: string;
  order: number;
  children?: MenuItem[];
}

export interface Menu {
  id?: string;
  name: string;
  slug: string;
  items: MenuItem[];
}

export interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  status?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: { id?: string; name?: string; email?: string; avatar?: string };
  categories?: Array<{ id?: string; name: string; slug: string }>;
  tags?: Array<{ id?: string; name: string; slug: string }>;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Page {
  id?: string;
  title: string;
  slug: string;
  content?: string;
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
  order?: number;
  socialLinks?: SocialLinks;
}

export interface Testimonial {
  id?: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  clientAvatar?: string;
  content: string;
  rating?: number;
}

export interface Service {
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  order?: number;
}

export interface SiteData {
  settings: SiteSettings;
  menus: Menu[];
  services: Service[];
  testimonials: Testimonial[];
  team: TeamMember[];
}

export interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  keywords?: string;
  noIndex?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function cmsImageUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function getMenuBySlug(menus: Menu[], slug: string): Menu | undefined {
  return menus.find((m) => m.slug === slug);
}

// ─── API Calls ────────────────────────────────────────────────────────────────

export async function getSiteData(revalidate = 60): Promise<SiteData> {
  const fallback: SiteData = {
    settings: { siteTitle: 'My Site' },
    menus: [],
    services: [],
    testimonials: [],
    team: [],
  };

  try {
    const res = await fetch(`${BASE_URL}/public/site-data`, {
      next: { revalidate },
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    return {
      settings: json.settings ?? fallback.settings,
      menus: Array.isArray(json.menus) ? json.menus : [],
      services: Array.isArray(json.services) ? json.services : [],
      testimonials: Array.isArray(json.testimonials) ? json.testimonials : [],
      team: Array.isArray(json.team) ? json.team : [],
    };
  } catch {
    return fallback;
  }
}

export async function getPublishedPosts(
  opts: { page?: number; limit?: number } = {},
  revalidate = 60,
): Promise<PostsResponse> {
  const { page = 1, limit = 10 } = opts;
  const empty: PostsResponse = { data: [], total: 0, page, limit, totalPages: 0 };

  try {
    const url = `${BASE_URL}/posts/public?status=published&page=${page}&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return empty;
    const json = await res.json();
    if (Array.isArray(json)) {
      return { data: json, total: json.length, page, limit, totalPages: 1 };
    }
    return {
      data: Array.isArray(json.data) ? json.data : [],
      total: json.total ?? 0,
      page: json.page ?? page,
      limit: json.limit ?? limit,
      totalPages: json.totalPages ?? 1,
    };
  } catch {
    return empty;
  }
}

export async function getPostBySlug(slug: string, revalidate = 60): Promise<Post | null> {
  try {
    const res = await fetch(`${BASE_URL}/posts/public/${slug}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string, revalidate = 60): Promise<Page | null> {
  try {
    const res = await fetch(`${BASE_URL}/public/pages/${slug}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getSeoMeta(route: string, revalidate = 60): Promise<SeoMeta | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/seo-meta/public?route=${encodeURIComponent(route)}`,
      { next: { revalidate } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
