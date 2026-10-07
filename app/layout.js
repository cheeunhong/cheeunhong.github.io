import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Particles from '@/components/Particles';
import ScrollToTop from '@/components/ScrollToTop';
import Navigation from '@/components/Navigation';
import { getProfile } from '@/lib/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const siteDescription = 'Cheeun Hong is a postdoctoral researcher at CISPA Helmholtz Center for Information Security, working on efficient AI: quantization, pruning, and adaptive computation for vision models, generative models, and LLMs.';

export const metadata = {
  title: {
    default: 'Cheeun Hong — Efficient AI Researcher',
    template: '%s | Cheeun Hong',
  },
  description: siteDescription,
  keywords: ['efficient AI', 'model compression', 'quantization', 'pruning', 'on-device vision', 'generative models', 'image super-resolution', 'video generation', 'CISPA', 'Seoul National University'],
  authors: [{ name: 'Cheeun Hong' }],
  metadataBase: new URL('https://cheeunhong.github.io'),
  openGraph: {
    title: 'Cheeun Hong — Efficient AI Researcher',
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/prof_pic.jpg', width: 512, height: 512, alt: 'Cheeun Hong' }],
  },
  twitter: {
    card: 'summary',
    title: 'Cheeun Hong — Efficient AI Researcher',
    description: siteDescription,
    images: ['/prof_pic.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💜</text></svg>',
  },
};

export default function RootLayout({ children }) {
  const profile = getProfile();
  const social = profile.social || {};

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-bg text-text min-h-screen flex flex-col antialiased">
        <Particles className="desktop-particles" />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navigation name={profile.name} email={profile.email} cv={profile.cv} social={social} />
        <main id="main-content" className="site-main flex-1">
          {children}
        </main>
        <footer className="site-footer text-sm text-text-muted">
          <div className="site-container py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} {profile.name}.</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {profile.email && <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">Email</a>}
              {social.scholar && <a href={social.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Google Scholar</a>}
              {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>}
            </div>
          </div>
        </footer>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <ScrollToTop />
      </body>
    </html>
  );
}
