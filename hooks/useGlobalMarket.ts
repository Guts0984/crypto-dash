'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMarketGlobal } from '@/data/globalMarketData';

export function useGlobalMarket() {
  return useQuery({
    queryKey: ['globalMarket'],
    queryFn: async () => {
      const data = await fetchMarketGlobal();
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
