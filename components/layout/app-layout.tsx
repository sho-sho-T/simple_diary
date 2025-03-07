import { Header } from './header';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-1 container py-6", className)}>
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>© 2024 シンプル日記</p>
          <p>プライバシー・利用規約</p>
        </div>
      </footer>
      <Toaster position="bottom-right" />
    </div>
  );
} 