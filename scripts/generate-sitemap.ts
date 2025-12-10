import fs from 'fs';
import path from 'path';
import { navigationConfig } from '../src/config/navigation';

const SITE_URL = 'https://tftodds.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  priority: string;
  changefreq: string;
}

// Get current date in ISO format
const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0] + 'T00:00:00+00:00';
};

// Determine priority and changefreq based on URL
const getUrlMetadata = (url: string): { priority: string; changefreq: string } => {
  // Homepage has highest priority
  if (url === '/') {
    return { priority: '1.0', changefreq: 'weekly' };
  }

  // Main tools (rolling odds)
  if (url === '/rolling-odds') {
    return { priority: '0.9', changefreq: 'weekly' };
  }

  // Trait pages and augment subpages
  if (url === '/encounters' || url.startsWith('/augments/augments-simulator/')) {
    return { priority: '0.8', changefreq: 'weekly' };
  }

  if (url.startsWith('/augments/') || url.startsWith('/traits/') || url.startsWith('/data/')) {
    return { priority: '0.7', changefreq: 'weekly' };
  }

  // Default for other pages
  return { priority: '0.6', changefreq: 'monthly' };
};

// Flatten navigation config to get all URLs
const getAllUrls = (): string[] => {
  const urls: string[] = [];

  navigationConfig.forEach(item => {
    // Add parent URL if it's a real page (not just a dropdown container)
    urls.push(item.href);

    // Add children URLs
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        urls.push(child.href);
      });
    }
  });

  return urls;
};

// Generate sitemap XML
const generateSitemap = (): string => {
  const currentDate = getCurrentDate();
  const urls = getAllUrls();

  // Add homepage
  const homepageMetadata = getUrlMetadata('/');
  const sitemapUrls: SitemapUrl[] = [
    {
      loc: SITE_URL + '/',
      lastmod: currentDate,
      priority: homepageMetadata.priority,
      changefreq: homepageMetadata.changefreq
    }
  ];

  // Add all navigation URLs
  urls.forEach(url => {
    const metadata = getUrlMetadata(url);
    sitemapUrls.push({
      loc: SITE_URL + url,
      lastmod: currentDate,
      priority: metadata.priority,
      changefreq: metadata.changefreq
    });
  });

  // Build XML
  const urlElements = sitemapUrls
    .map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>
`;
};

// Main execution
const main = () => {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');

  fs.writeFileSync(outputPath, sitemap, 'utf-8');

  console.log('✅ Sitemap generated successfully at:', outputPath);
  console.log('📄 Total URLs:', getAllUrls().length + 1); // +1 for homepage
};

main();
