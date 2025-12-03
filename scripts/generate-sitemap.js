const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://tftodds.com';

// Navigation config - copied from src/config/navigation.ts
const navigationConfig = [
  {
    label: 'Rolling odds tool',
    href: '/rolling-odds'
  },
  {
    label: 'Encounters',
    href: '/encounters'
  },
  {
    label: 'Augments',
    href: '/augments',
    children: [
      {
        label: 'Augments Tier',
        href: '/augments/augments-tier'
      },
      {
        label: 'Augments Distribution',
        href: '/augments/augments-distribution'
      },
      {
        label: 'Augments Tables',
        href: '/augments/augments-tables'
      }
    ]
  }
];

// Get current date in ISO format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0] + 'T00:00:00+00:00';
};

// Flatten navigation config to get all URLs
const getAllUrls = () => {
  const urls = [];

  navigationConfig.forEach(item => {
    // Add parent URL
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
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  const urls = getAllUrls();

  // Add homepage
  const sitemapUrls = [
    {
      loc: SITE_URL + '/',
      lastmod: currentDate
    }
  ];

  // Add all navigation URLs
  urls.forEach(url => {
    sitemapUrls.push({
      loc: SITE_URL + url,
      lastmod: currentDate
    });
  });

  // Build XML
  const urlElements = sitemapUrls
    .map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
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
