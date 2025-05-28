import Logo from './Logo';
import { ModeToggle } from './mode-toggle';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export function Header() {
  return (
    <nav className="flex h-[73px] items-center justify-between px-6">
      <Logo />
      <div className="flex items-center justify-between gap-4 w-[30%]">
        <div className="relative">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-primary" />
          <Input
            type="search"
            placeholder="Search a coin..."
            className="pl-8 border-none shadow-none w-[300px]"
          />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
