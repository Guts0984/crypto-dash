import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import Image from 'next/image';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface CryptoComboBox {
  value: string;
  label: string;
  icon: string;
  price: string;
  change: string;
}

interface CoinComboBoxProp {
  coins: CryptoComboBox[] | undefined;
  isLoading: boolean;
  isError: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function CoinCombobox({
  coins,
  isLoading,
  isError,
  value,
  setValue,
}: CoinComboBoxProp) {
  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-11 w-36" />
        <Skeleton className="h-7 w-32" />
      </div>
    );
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-36 justify-between text-left"
          disabled={isLoading}
        >
          {value ? (
            <div className="flex gap-2 items-center">
              {coins?.find(coin => coin.value === value)?.icon ? (
                <Image
                  src={coins.find(coin => coin.value === value)?.icon as string}
                  alt={`${
                    coins?.find(coin => coin.value === value)?.label || 'coin'
                  } icon`}
                  className="w-5 h-5 mr-2"
                  width={20}
                  height={20}
                />
              ) : null}
              <span>{coins?.find(coin => coin.value === value)?.label}</span>
            </div>
          ) : (
            'Select coin...'
          )}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search coin..." />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : isError ? (
              <CommandEmpty>Failed to lead coins.</CommandEmpty>
            ) : coins && coins.length === 0 ? (
              <CommandEmpty>No coin found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {coins?.map(coin => (
                  <CommandItem
                    key={coin.value}
                    value={coin.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center"
                  >
                    <Image
                      src={coin.icon}
                      alt={`${coin.label} icon`}
                      className="w-5 h-5 mr-2"
                      width={20}
                      height={20}
                    />
                    {coin.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === coin.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
