import * as cheerio from "cheerio";
import { discoDetail } from "@/constant";

export type ScrapedDisco = {
  discoName: string;
  load: string;
};

export type ScrapedGenco = {
  gencoName: string;
  load: string;
};

export async function fetchDiscos(): Promise<ScrapedDisco[]> {
  const res = await fetch("https://www.niggrid.org/DisCoLoadProfile");
  const html = await res.text();

  const $ = cheerio.load(html);

  const data = $("#MainContent_gvDiscoLoadProfiles tr")
    .map((_, row) => {
      const tds = $(row).find("td");
      if (tds.length !== 2) return null;

      const discoName = $(tds[0]).text().trim();
      const load = $(tds[1]).text().trim();

      if (/^(total|summary|grand total)/i.test(discoName)) return null;

      const disco = discoDetail.find(
        (d) => d.disco.toLowerCase() === discoName.toLowerCase(),
      );

      return {
        discoName,
        load,
        ...(disco || {}),
        coordinates: disco ? [disco.lng, disco.lat] : [7.3986, 9.0765],
      };
    })
    .get()
    .filter(Boolean);

  return data as ScrapedDisco[];
}

export async function fetchGencos(): Promise<ScrapedGenco[]> {
  const res = await fetch("https://www.niggrid.org/Dashboard");
  const html = await res.text();

  const $ = cheerio.load(html);

  const data = $("#MainContent_dlstRealtimeGen tbody tr td")
    .map((_, td) => {
      const $td = $(td);
      const row = $td.find(".row");
      if (row.length === 0) return null;

      const cols = row.children("div");
      if (cols.length < 3) return null;

      const gencoName = $(cols[1]).text().trim();
      const load = $(cols[2]).text().trim();

      if (/^(total|summary|grand total)/i.test(gencoName)) return null;

      return { gencoName, load };
    })
    .get()
    .filter(Boolean);

  return data as ScrapedGenco[];
}
