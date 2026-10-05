import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { services } from './src/data/content.js';
import { technologyDetails } from './src/data/technologyDetails.js';
import { industryDetails } from './src/data/industryDetails.js';
import { solutionDetails } from './src/data/solutionDetails.js';
import { caseStudyDetails } from './src/data/caseStudyDetails.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  try {
    console.log('[Sitemap] Generating sitemap...');
    // Base routes
    const routes = [
      '/', '/about', '/contact', '/services', '/portfolio', 
      '/pricing', '/booking', '/technologies', '/faqs', '/privacy-policy', '/blog'
    ];

    // Include locally-known detail pages even when the CMS API is unavailable during build.
    routes.push(
      ...services.map(service => `/services/${service.slug}`).filter(Boolean),
      ...Object.keys(technologyDetails).map(slug => `/technologies/${slug}`),
      ...Object.keys(industryDetails).map(slug => `/industries/${slug}`),
      ...Object.keys(solutionDetails).map(slug => `/solutions/${slug}`),
      ...Object.keys(caseStudyDetails).map(slug => `/case-studies/${slug}`)
    );
    
    // Fetch blog posts
    try {
      console.log('[Sitemap] Fetching blog posts...');
      const baseUrl = (process.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/v1/public/blog/`);
      const data = await response.json();
      
      if (data.success && data.data) {
        data.data.forEach(post => {
          routes.push(`/blog/${post.slug}`);
        });
        console.log(`[Sitemap] Fetched ${data.data.length} blog posts.`);
      }
    } catch (apiError) {
      console.warn('[Sitemap] Warning: Could not fetch blog posts for sitemap. Using only static routes.', apiError.message);
    }

    const uniqueRoutes = [...new Set(routes)];
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueRoutes.map(route => `  <url>\n    <loc>https://www.nowicstdio.tech${route}</loc>\n    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}
</urlset>`;

    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
    console.log('[Sitemap] Successfully generated public/sitemap.xml');
  } catch (error) {
    console.error('[Sitemap] Error generating sitemap:', error);
    process.exit(1); // Exit with error if it completely fails
  }
}

generateSitemap();
