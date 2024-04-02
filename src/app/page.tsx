
// ----------------------------------------------------------------------

import HomeView from "src/sections/home/view/home-view";

export const metadata = {
  title: 'VDream-Entertainment',
  description: 'VDream-Entertainment',
  themeColor: '#000000',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function HomePage() {
  return <HomeView />;
}
