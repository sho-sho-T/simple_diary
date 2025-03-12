"use client";

import { signIn } from "next-auth/react";
import { LoginPresentation } from "./presentation";
export const LoginContainer = () => {
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return <LoginPresentation onGoogleLogin={handleGoogleLogin} />;
}; 