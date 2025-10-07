import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
import { ToastContainer } from 'react-toastify';
import 'react-vertical-timeline-component/style.min.css';
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Momodu Studios',
    template: '%s | Bookings',
  },
  description: 'Photostudio booking web application',
  keywords: [
    'Photo studio',
    'bookings',
    'Photostudio Abuja',
    'Studio booking',
    'Momodu Studios',
  ],
  authors: [{ name: 'Momodu Sadiq' }, { name: 'Ekong Emmanuel' }],
  creator: 'Ekong Emmanuel',
  metadataBase: new URL('https://www.momodustudios.com'),
  alternates: {
    canonical: 'https://www.momodustudios.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.momodustudios.com',
    title: 'Momodu Studios Booking Web App',
    description: 'Photo studio booking web app',
    siteName: 'Momodu Studios 1.0',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momodu Studios Booking Web App',
    description: 'Photostudio booking web application',
    creator: '@momodustudios', // update or remove
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',

};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  const session = await getServerSession();
  return (
    <html lang="en" >
      <body className={`${inter.variable} ${montserrat.variable} font-inter min-h-screen`}>
        <SessionProviderWrapper session={session}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
