"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function ClientMapLoader() {
  // Dynamically import the Map component with SSR disabled
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => (
          <p className="h-screen w-screen flex items-center justify-center">
            Loading map...
          </p>
        ), // Basic loading state
        ssr: false, // Ensure it only renders on the client side
      }),
    []
  );

  return <Map />;
}
