"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export function useAuthCheck(redirectTo?: string, reverseRedirect?: boolean) {
  const router = useRouter();

  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (redirectTo) {
        if (!currentUser && !reverseRedirect) {
          router.replace(redirectTo);
        } else if (currentUser && reverseRedirect) {
          router.replace(redirectTo);
        }
      }
    });

    return () => unsubscribe();
  }, [router, redirectTo, reverseRedirect]);

  return { user, loading };
}
