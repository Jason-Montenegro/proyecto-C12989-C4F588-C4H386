"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";

type RequireAuthProps = {
  children: ReactNode;

  allow?: "user" | "guest";
};

export default function RequireAuth({
  children,
  allow = "user",
}: RequireAuthProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const allowed = allow === "user" ? user !== null : user === null;

  useEffect(() => {
    if (loading || allowed) return;
    router.replace(allow === "user" ? "/login" : "/lobby");
  }, [loading, allowed, allow, router]);

  if (loading || !allowed) return null;
  return children;
}
