'use client';

import { useAllCryptos } from '@/hooks/useAllCryptos';
import { useEffect, useState } from 'react';
import { CoinCombobox, CryptoComboBox } from './CoinComboBox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { fetchCryptoPrices } from '@/data/allCoinPrices';
import { Skeleton } from './ui/skeleton';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartData = {
  data: string;
  price: string;
};

export function DropDown() {
  const { data: cryptos, isLoading, isError } = useAllCryptos();
  const [value, setValue] = useState<string>('');
  const [formattedPrice, setFormattedPrice] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [comboBoxCoins, setComboBoxCoins] = useState<CryptoComboBox[]>([]);
  const selectedCoin = comboBoxCoins?.find(coin => coin.value === value);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (cryptos) {
      const formattedData: CryptoComboBox[] = (cryptos as unknown[])
        .map((crypto: unknown) => {
          if (
            typeof crypto === 'object' &&
            crypto !== null &&
            'id' in crypto &&
            'name' in crypto &&
            'image' in crypto &&
            'current_price' in crypto &&
            'price_change_percentage_24h' in crypto
          ) {
            return {
              value: crypto.id as string,
              label: crypto.name as string,
              icon: crypto.image as string,
              price: String(crypto.current_price),
              change:
                (crypto.price_change_percentage_24h as number).toFixed(4)[0] !==
                '-'
                  ? `+${(crypto.price_change_percentage_24h as number).toFixed(4)}`
                  : (crypto.price_change_percentage_24h as number).toFixed(4),
            };
          }
          return null;
        })
        .filter((item): item is CryptoComboBox => item !== null);
      setComboBoxCoins(formattedData);
    }
  }, [cryptos]);

  useEffect(() => {
    if (comboBoxCoins && comboBoxCoins.length > 0 && !value) {
      setValue(comboBoxCoins[0].value);
    }
  }, [comboBoxCoins, value]);

  useEffect(() => {
    if (value) {
      if (selectedCoin) {
        const numericCoinPrice = parseFloat(selectedCoin.price);
        const formattedPrice = numericCoinPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        setFormattedPrice(formattedPrice);
      }
    }
  }, [value, comboBoxCoins, selectedCoin]);

  useEffect(() => {
    async function fetchPrices() {
      if (selectedCoin) {
        const data = await fetchCryptoPrices(selectedCoin?.value);
        const prices = (data as { prices: [number, number][] }).prices;
        const formattedPrices: ChartData[] = prices.map(
          ([timestamp, price]: [number, number]) => ({
            data: new Date(timestamp).toISOString().slice(0, 10),
            price: price.toFixed(2),
          })
        );
        let filteredPrices: ChartData[] = [];
        switch (selectedPeriod) {
          case '7D':
            filteredPrices = formattedPrices.slice(-7);
            break;
          case '15D':
            filteredPrices = formattedPrices.slice(-15);
            break;
          case '30D':
            filteredPrices = formattedPrices.slice(-30);
            break;
          default:
            break;
        }
        setChartData(filteredPrices);
      }
    }
    fetchPrices();
  }, [value, comboBoxCoins, selectedPeriod, selectedCoin]);

  function onChangeToggleGroup(item: string) {
    setSelectedPeriod(item);
  }

  return (
    <Card className="col-span-4 m-5 border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          <CoinCombobox
            coins={comboBoxCoins}
            isLoading={isLoading}
            isError={isError}
            value={value}
            setValue={setValue}
          />

          <div className="mt-4">
            <span className="text-2xl font-bold">{formattedPrice}</span>
            <span
              className={`ml-2 text-sm ${selectedCoin?.change[0] === '-' ? 'text-red-500' : 'text-green-500'}`}
            >
              {selectedCoin?.change}
            </span>
          </div>
        </CardTitle>
        <div className="flex gap-2">
          <ToggleGroup
            value={selectedPeriod}
            onValueChange={onChangeToggleGroup}
            type="single"
          >
            {['7D', '15D', '30D'].map((period, key) => (
              <ToggleGroupItem key={key} value={`${period}`}>
                {period}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[230px]">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <div className="h-[230px] mt-5">
            <ResponsiveContainer
              className={'text-[12px]'}
              width="100%"
              height={236}
            >
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" color="#64748b" />
                <YAxis dataKey="price" />

                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorWords)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
