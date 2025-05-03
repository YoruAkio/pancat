import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  // SEO Data
  const siteTitle = "Pancat | Creative Developer Collective";
  const siteDescription = "A collective of curious developers building fun, experimental projects with clean code, creative interfaces, and open-source collaboration.";
  const siteURL = "https://pancat.dev";
  const siteImage = "https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/pancat.png";
  const siteKeywords = "programming, development, open source, web development, creative coding, react, next.js, javascript, developer collective";
  const siteName = "Pancat";
  const twitterHandle = "@yoruakio";
  
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteURL} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteURL} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteURL} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={siteImage} />
        <meta property="twitter:creator" content={twitterHandle} />
        
        {/* Favicon - Multiple formats for cross-browser/device support */}
        <link rel="icon" href={siteImage} />
        <link rel="apple-touch-icon" sizes="180x180" href={siteImage} />
        <link rel="icon" type="image/png" sizes="32x32" href={siteImage} />
        <link rel="icon" type="image/png" sizes="16x16" href={siteImage} />
        
        {/* Additional SEO improvements */}
        <meta name="author" content="YoruAkio" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Preload critical assets */}
        <link rel="preload" href={siteImage} as="image" />
      </Head>
      
      <div className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} ${geistMono.className}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}