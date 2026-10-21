import { fetchDiscos } from "@/lib/scraper";

export async function GET() {
  const data = await fetchDiscos();
  return Response.json(data);
}
