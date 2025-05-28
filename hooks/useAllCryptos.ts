'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllCryptos } from '@/data/allCryptos';

export function useAllCryptos() {
  return useQuery<unknown[], Error>({
    queryKey: ['allCryptos'],
    queryFn: async () => {
      const data = await fetchAllCryptos();
      return data;
    },

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
