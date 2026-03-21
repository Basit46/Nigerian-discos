"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import MapView from "./MapView";
import { useGetDiscos } from "@/lib/queries";

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Content children={children} />
    </QueryClientProvider>
  );
};

export default RootLayoutContent;

const Content = ({ children }: { children: React.ReactNode }) => {
  const { data: discos = [] } = useGetDiscos();

  const zones = useMemo(() => {
    return discos.slice(0, -1).flatMap((disco) => {
      return disco?.zones?.map((zone) => ({
        zoneName: zone.zoneName,
        zoneCoordinates: zone.zoneCoordinates,
        discoName: disco.disco,
        color: disco.color,
      }));
    });
  }, [discos]);

  return (
    <div className="h-fit lg:h-dvh w-full p-5 flex flex-col lg:flex-row gap-3">
      {children}

      <div className="scrollbar-hide flex-1 overflow-auto ">
        <MapView data={discos.slice(0, -1)} zones={zones as any} />
      </div>
    </div>
  );
};
