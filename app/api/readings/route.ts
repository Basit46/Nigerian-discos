import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Reading from "@/lib/models/Reading";
import GencoReading from "@/lib/models/GencoReading";
import { fetchDiscos, fetchGencos } from "@/lib/scraper";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    const [discos, gencos] = await Promise.all([
      fetchDiscos(),
      fetchGencos(),
    ]);

    const discoReadings = discos.map((d) => ({
      disco: d.discoName,
      slot: now,
      loadMw: parseFloat(d.load) || 0,
      fetchedAt: now,
    }));

    const gencoReadings = gencos.map((g) => ({
      genco: g.gencoName,
      slot: now,
      loadMw: parseFloat(g.load) || 0,
      fetchedAt: now,
    }));

    const [savedDiscos, savedGencos] = await Promise.all([
      Reading.insertMany(discoReadings),
      GencoReading.insertMany(gencoReadings),
    ]);

    return NextResponse.json({
      ok: true,
      saved: { discos: savedDiscos.length, gencos: savedGencos.length },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
