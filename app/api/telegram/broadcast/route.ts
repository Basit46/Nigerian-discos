import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";
import { getDisco, sendMessage } from "@/utils/telegram";

export async function GET() {
  try {
    await connectDB();

    //Get all users to broadcast too
    const users = await User.find({ disco: { $exists: true } });

    const batchSize = 20;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (user) => {
          try {
            const disco = await getDisco(user.disco);
            await sendMessage({
              chatId: user.chatId,
              text: `⚡ Live load update for *${user.disco}*: ${disco?.load} MW`,
            });
          } catch (err) {
            console.error("Failed to send to user:", user.chatId, err);
          }
        }),
      );
    }

    return NextResponse.json({ ok: true, sentTo: users.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err });
  }
}
