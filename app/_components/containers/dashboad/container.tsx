"use client";

import { signOut } from "next-auth/react";
import { DashboardPresentation } from "./presentation";

interface DashboardContainerProps {
  userName: string;
}

export const DashboardContainer = ({ userName }: DashboardContainerProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <DashboardPresentation
      userName={userName} 
      onLogout={handleLogout} 
    />
  );
}; 