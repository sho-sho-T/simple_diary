import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MainNav } from './main-nav';
import { UserNav } from './user-nav';
import { MobileMenu } from './mobile-menu';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b bg-background",
      className
    )}>
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">シンプル日記</span>
        </Link>
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <MainNav />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
} 