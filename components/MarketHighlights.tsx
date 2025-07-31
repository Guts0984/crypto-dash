'use client';

import { useAllCategories } from '@/hooks/useAllCategories';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { BiCategory } from 'react-icons/bi';

type Category = {
  name: string;
};

function isCategory(category: unknown): category is Category {
  return (
    typeof category === 'object' &&
    category !== null &&
    'name' in category &&
    typeof (category as Category).name === 'string'
  );
}

function MarketHighlights() {
  const {
    data: allCategoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoryError,
  } = useAllCategories();
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    if (allCategoriesData) {
      const formattedData = allCategoriesData
        .slice(0, 3)
        .map((category: unknown) => {
          if (isCategory(category)) {
            return { name: category.name };
          }
          return null;
        })
        .filter((item): item is Category => item !== null);
      setCategories(formattedData);
    }
  }, [allCategoriesData]);

  return (
    <div>
      <Card className="p-6 py-7 space-y-6 border-none shadow-none mt-5">
        <h2 className="text-xl font-semibold">Market Highlights</h2>
        {isCategoryError ? (
          <div className="text-center text-sm text-red-500">
            Failed to lead categories. Please try again later.
          </div>
        ) : categories !== null && !isCategoriesLoading ? (
          <div className="space-y-3">
            <CryptoCategories categories={categories} />
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            <Skeleton className="w-full h-28 rounded-md" />
          </div>
        )}
      </Card>
    </div>
  );
}

function CryptoCategories({ categories }: { categories: Category[] }) {
  return (
    <Card className="p-3 flex flex-row items-center justify-between shadow-none border-none">
      <div className="flex items-center gap-2 w-auto flex-shrink-0">
        <div className="bg-purple-400/10 size-8 flex items-center justify-center text-purple-500 rounded-md">
          <BiCategory />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Top Categories
        </p>
      </div>

      <div className="text-lg font-medium flex flex-wrap w-auto">
        {categories.map((category, index) => (
          <span
            key={index}
            className="text-xs bg-purple-400/10 p-1 m-1 text-purple-500 rounded-md px-2"
          >
            {category.name}
          </span>
        ))}
      </div>
    </Card>
  );
}

export default MarketHighlights;
