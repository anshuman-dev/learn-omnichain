"use client";
import { usePathname } from 'next/navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import { useMenuStore } from '../lib/store/useMenuStore';
import PauseButton from '../components/ui/PauseButton';
import MainMenu from '../components/menu/MainMenu';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isPaused } = useMenuStore();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {!isHomePage && !isPaused && <PauseButton />}
        
        {isPaused ? (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <MainMenu isPauseMenu={true} />
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
