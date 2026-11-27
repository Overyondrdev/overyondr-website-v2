// URL for each Markdown file in src/content/pages (file name -> path). Files not listed use /<file-name>.
export const pageRoutes: Record<string, string> = {
  'home-tray-terms': 'home-tray/terms',
  'modern-slavery-statement': 'modern-slavery-statement',
};
export const pagePath = (id: string) => pageRoutes[id] ?? id;
