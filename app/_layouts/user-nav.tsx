'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export function UserNav() {
  const { data: session } = useSession();
  const user = session?.user;
  
  if (!user) {
    return (
      <Button asChild variant="ghost" size="sm">
        <a href="/api/auth/signin">ログイン</a>
      </Button>
    );
  }

  // ユーザー名がある場合はそれを、なければメールアドレスの@より前の部分を表示
  const displayName = user.name || (user.email ? user.email.split('@')[0] : 'ユーザー');
  
  // アバターのイニシャルを取得
  const getInitials = () => {
    if (user.name) {
      return user.name.substring(0, 2).toUpperCase();
    }
    return user.email ? user.email.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ''} alt={displayName} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            プロフィール
          </DropdownMenuItem>
          <DropdownMenuItem>
            設定
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 