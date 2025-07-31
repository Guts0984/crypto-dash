'use client';

import { DropDown } from '@/components/CryptoChart';
import { CryptoOverview } from '@/components/CryptoOverview';
import { Header } from '@/components/Header';

import MarketHighlights from '@/components/MarketHighlights';
import MarketTable from '@/components/MarketTable';
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
        <main className="w-[65%]">
          <PriceCards />
          <DropDown />
          <MarketTable />
        </main>
        <main className="w-[35%]">
          <CryptoOverview />
          <MarketHighlights />
        </main>
      </div>
    </>
  );
}
