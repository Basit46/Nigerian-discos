import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Reading from "@/lib/models/Reading";
import { fetchDiscos } from "@/lib/scraper";

export async function POST() {
  try {
    await connectDB();

    const discos = await fetchDiscos();
    const now = new Date();

    const readings = discos.map((d) => ({
      disco: d.discoName,
      slot: now,
      loadMw: parseFloat(d.load) || 0,
      fetchedAt: now,
    }));

    const saved = await Reading.insertMany(readings);

    return NextResponse.json({ ok: true, saved: saved.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
