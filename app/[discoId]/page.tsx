"use client";

import {
  LucideChevronLeft,
  LucidePlus,
  LucideTowerControl,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetDisco } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

const DiscoDetails = () => {
  const { discoId } = useParams<{ discoId: string }>();
  const discoName = decodeURIComponent(discoId)?.split(" ")[0];

  const { data: disco, isLoading } = useGetDisco(decodeURIComponent(discoId));

  return (
    <div className="pb-7 lg:pt-auto py-3 px-4 w-full lg:w-[30%] xl:w-[25%] h-full bg-white text-black overflow-y-auto">
      <div className="space-y-2">
        <Link href={"/"}>
          <LucideTowerControl size={24} />
        </Link>

        <Link href={"/"}>
          <LucideChevronLeft className="mt-10 text-gray-500" />
        </Link>

        <h1 className="mt-2 font-semibold text-[24px] leading-tight">
          {discoName} <br /> DISCO data
        </h1>
      </div>

      {isLoading ? (
        <div className="mt-6 space-y-10">
          <Skeleton className="w-full h-[150px] rounded-none" />
          <Skeleton className="w-full h-[150px] rounded-none" />
          <Skeleton className="w-full h-[150px] rounded-none" />
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          <div className="relative bg-gray-200 w-full h-fit px-3 py-2.5 space-y-2">
            <h2 className="font-medium">Live Load</h2>
            <p className="text-gray-600">{disco?.load} MW</p>
          </div>

          <div className="relative bg-gray-200 w-full h-fit px-3 py-2.5 flex flex-col gap-4 text-sm">
            <LucidePlus className="absolute text-gray-700 size-4 -top-2 -left-2" />
            <LucidePlus className="absolute text-gray-700 size-4 -top-2 -right-2" />
            <LucidePlus className="absolute text-gray-700 size-4 -bottom-2 -left-2" />
            <LucidePlus className="absolute text-gray-700 size-4 -bottom-2 -right-2" />

            <div>
              <p>Phone number</p>
              <p className="text-gray-600">{disco?.phoneNumber}</p>
            </div>

            <div>
              <p>Email</p>

              <a
                href={`mailto:${disco?.email}`}
                className="text-gray-600 hover:underline break-all"
              >
                {disco?.email}
              </a>
            </div>

            <div>
              <p>Website</p>
              <a
                href={disco?.website}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>
          </div>

          <div className="relative bg-gray-200 w-full h-fit px-3 py-2.5">
            <LucidePlus className="absolute text-gray-700 size-4 -top-2 -left-2" />
            <LucidePlus className="absolute text-gray-700 size-4 -top-2 -right-2" />
            <LucidePlus className="absolute text-gray-700 size-4 -bottom-2 -left-2" />
            <LucidePlus className="absolute text-gray-700 size-4 -bottom-2 -right-2" />

            <h2 className="font-medium">Zones Covered</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {disco?.zones?.map((z, i) => (
                <span
                  key={i}
                  className="bg-white px-2 py-1 text-sm font-medium text-slate-700 border border-slate-200"
                >
                  {z.zoneName}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoDetails;
