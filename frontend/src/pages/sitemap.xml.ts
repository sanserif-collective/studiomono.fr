import { BASE_URL } from 'astro:env/server';
import { getProjects } from 'queries/getProjects';

export const GET = async () => {
  const { projects } = await getProjects();

  const pages = [
    '/',
    '/about',
    '/contact',
    ...projects.data.map((project) => `/projects/${project.attributes.slug}`),
  ];

  return new Response(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
