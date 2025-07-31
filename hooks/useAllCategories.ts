'use client';

import { fetchAllCategories } from '@/data/categories';
import { useQuery } from '@tanstack/react-query';

export function useAllCategories() {
  return useQuery<unknown[], Error>({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const data = await fetchAllCategories();
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
