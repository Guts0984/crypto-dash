'use client';

import { DropDown } from '@/components/CryptoChart';
import { Header } from '@/components/Header';
import { MarketOverview } from '@/components/MarketOverview';
import { PriceCards } from '@/components/PriceCards';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(theme === 'dark' ? 'bg-black' : 'bg-slate-100');
  }, [theme]);
  return (
    <>
      <Header />
      <div
        className={`font-main ${bgColor} p-2 min-h-screen flex flex-row gap-2 `}
      >
        <main className="w-[70%]">
          <PriceCards />
          <DropDown />
        </main>
        <main className="w-[30%]">
          <MarketOverview />
        </main>
      </div>
    </>
  );
}
