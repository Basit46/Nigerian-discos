import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";
import { formatLowLoadMessage, getDisco, sendMessage } from "@/utils/telegram";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({ disco: { $exists: true } });

    const batchSize = 20;
    const LOW_THRESHOLD = 50;

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (user) => {
          try {
            const disco = await getDisco(user.disco);
            if (!disco || !disco.load) return;

            const load = parseFloat(disco.load);
            const isLow = load < LOW_THRESHOLD;

            // Low Alert
            if (isLow && !user.lastIsLow) {
              await sendMessage({
                chatId: user.chatId,
                text: `
🚨 *Low Power Alert*

📍 ${user.disco}
⚡ Load: *${load} MW*

Power supply may be unstable.
`,
              });

              user.lastIsLow = true;
              await user.save();
            }

            // Recovery Alert
            if (!isLow && user.lastIsLow) {
              await sendMessage({
                chatId: user.chatId,
                text: `
✅ *Power Recovery*

📍 ${user.disco}
⚡ Load: *${load} MW*

Supply is getting stable now.
`,
              });

              user.lastIsLow = false;
              await user.save();
            }
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
