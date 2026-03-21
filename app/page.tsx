"use client";

import { LucideTowerControl } from "lucide-react";
import Link from "next/link";
import { useGetDiscos } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: discos = [], isLoading } = useGetDiscos();

  return (
    <div className="pb-7 lg:pt-auto py-3  px-4 w-full lg:w-[30%] xl:w-[25%] h-full bg-white text-black overflow-y-auto">
      <div className="space-y-2">
        <LucideTowerControl size={24} />

        <h1 className="font-semibold text-[30px] leading-tight">
          Nigeria <br /> DISCOs data
        </h1>
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-4">
          {Array.from({ length: 11 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-[40px] rounded-none" />
          ))}

          <Skeleton className="mt-5 w-full h-[40px] rounded-none" />
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {discos?.slice(0, -1).map((d, i) => (
            <Link
              key={d.discoName}
              href={`/${encodeURIComponent(d.discoName)}`}
              className="w-full flex gap-2 pb-2 px-1 border-b border-b-accent-foreground/20 text-sm"
            >
              <p>{i + 1}.</p>
              <p className="flex-1">{d.discoName}</p>
              <p>{d.load} MW</p>
            </Link>
          ))}

          {discos.slice(-1).map((d, i) => (
            <div
              key={d.discoName}
              className="mt-5 w-full flex gap-2 py-2 px-1 border-b border-b-accent-foreground/20"
            >
              <p className="flex-1">{d.discoName}</p>
              <p>{d.load} MW</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
