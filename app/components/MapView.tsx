import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideZap } from "lucide-react";

type DataType = {
  coordinates: [number, number];
  discoName: string;
  load: string;
  zones?: {
    zoneName: string;
    zoneCoordinates: number[];
  }[];
  phoneNumber?: string;
  email?: string;
  website?: string;
  color?: string;
};

type Zones = {
  zoneName: string;
  zoneCoordinates: number[];
  discoName: string;
  color: string;
};

const MapView = ({ data, zones }: { data: DataType[]; zones: Zones[] }) => {
  return (
    <div className="relative w-full h-fit">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2800,
          center: [8.5, 8],
        }}
      >
        <Geographies geography="/nigeria.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill=""
                stroke="#C0C0C0"
                strokeWidth={0.3}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Discos */}
        {data.map(
          (
            {
              discoName,
              coordinates,
              load,
              phoneNumber,
              email,
              zones,
              website,
              color,
            },
            i,
          ) => {
            return (
              <Popover key={i}>
                <PopoverTrigger asChild className="cursor-pointer">
                  <Marker coordinates={coordinates}>
                    <rect x={-10} y={-10} width={20} height={20} fill={color} />
                  </Marker>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-[280px] p-3.5 overflow-hidden rounded-none border-none shadow-2xl">
                  <div className="">
                    <h1 className="text-[16px] font-bold leading-tight">
                      {discoName}
                    </h1>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex h-6 items-center gap-1 rounded-full py-1">
                        <LucideZap className="size-4 text-gray-400" />
                        <span className="text-[12px] font-bold uppercase tracking-wider">
                          {load} MW
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-gray-600 text-[13px]">{phoneNumber}</p>
                      <p className="text-gray-600 text-[13px] break-all">
                        {email}
                      </p>
                      <a
                        href={website}
                        target="_blank"
                        className="text-blue-600 hover:underline text-[13px]"
                      >
                        Visit Website
                      </a>
                    </div>

                    <div>
                      <p className="text-[12px] text-gray-400">
                        Coverage Zones
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {zones?.map((zone) => (
                          <span
                            key={zone.zoneName}
                            className="bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 border border-slate-200"
                          >
                            {zone.zoneName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          },
        )}

        {/* Zones under Discos */}
        {zones.map(({ zoneName, zoneCoordinates, discoName, color }, i) => {
          return (
            <Popover key={i}>
              <PopoverTrigger asChild className="cursor-pointer">
                <Marker coordinates={zoneCoordinates as any}>
                  <rect
                    x={-1.5}
                    y={-1.5}
                    width={10}
                    height={10}
                    fill={color}
                    stroke="white"
                    strokeWidth={0.5}
                  />
                </Marker>
              </PopoverTrigger>
              <PopoverContent className="z-50 w-[200px] p-3.5 overflow-hidden rounded-none border-none shadow-2xl">
                <div className="space-y-1">
                  <h1 className="text-[16px] font-semibold">{zoneName} zone</h1>
                  <p className="text-sm text-gray-700">Under {discoName}</p>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default MapView;
