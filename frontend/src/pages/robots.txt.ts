import { BASE_URL } from 'astro:env/server';

export const GET = () => new Response(`User-agent: *\nSitemap: ${BASE_URL}/sitemap.xml`);
