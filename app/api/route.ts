import * as cheerio from "cheerio";
import { discoDetail } from "@/constant";

export async function GET() {
  const res = await fetch("https://www.niggrid.org/DisCoLoadProfile");
  const html = await res.text();

  const $ = cheerio.load(html);

  const data = $("#MainContent_gvDiscoLoadProfiles tr")
    .map((_, row) => {
      const tds = $(row).find("td");
      if (tds.length !== 2) return null;

      const discoName = $(tds[0]).text().trim();
      const load = $(tds[1]).text().trim();

      const disco = discoDetail.find(
        (d) => d.disco.toLowerCase() === discoName.toLowerCase(),
      );

      return {
        discoName,
        load,
        ...(disco || {}),
        coordinates: disco ? [disco.lng, disco.lat] : [7.3986, 9.0765], // fallback
      };
    })
    .get()
    .filter(Boolean);

  return Response.json(data);
}
