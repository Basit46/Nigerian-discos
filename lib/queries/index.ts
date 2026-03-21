import { Disco } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetDiscos = () => {
  return useQuery<Disco[]>({
    queryKey: ["discos"],
    queryFn: async () => {
      const res = await axios.get("/api");
      return res.data;
    },
  });
};

export const useGetDisco = (discoId: string) => {
  return useQuery<Disco | undefined>({
    queryKey: ["discos", discoId],

    queryFn: async () => {
      const res = await axios.get("/api");

      return (res.data as Disco[]).find(
        (d) => d.discoName.toLowerCase() === discoId.toLowerCase(),
      );
    },
  });
};
