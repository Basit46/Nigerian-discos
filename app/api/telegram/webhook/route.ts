import { discosList } from "@/constant";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { getDisco, sendMessage } from "@/utils/telegram";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    await connectDB();

    //  HANDLE BUTTON CLICK (callback_query)
    if (body.callback_query) {
      const callback = body.callback_query;
      const chatId = callback.message.chat.id;
      const telegramId = callback.from.id;
      const data = callback.data;

      if (data.startsWith("DISCO_")) {
        const disco = data.replace("DISCO_", "");

        await User.findOneAndUpdate(
          { telegramId },
          {
            disco,
            step: "COMPLETED",
          },
        );

        await sendMessage({
          chatId,
          text: `✅ You have selected *${disco}*.\n\nYou're all set!`,
        });
      }

      return NextResponse.json({ ok: true });
    }

    const message = body.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text;
    const telegramId = message.from?.id;

    let user = await User.findOne({ telegramId });

    if (text?.startsWith("/start")) {
      if (!user) {
        user = await User.create({
          telegramId,
          chatId,
          userName: message.from?.username,
          firstName: message.from?.first_name,
          lastName: message.from?.last_name,
          step: "SELECT_DISCO",
        });

        await sendMessage({
          chatId,
          text: `👋 Hello ${
            message.from?.first_name || "there"
          }!\n\nWelcome to *Naija DISCO Bot* ⚡\n\nWhich DISCO do you belong to?`,
          keyboard: discosList.map((disco) => [
            { text: disco, callback_data: `DISCO_${disco}` },
          ]),
        });
      } else {
        await sendMessage({
          chatId,
          text: `👋 Welcome back ${
            user.firstName || "mate"
          }!\n\nYou're already registered.`,
        });
      }

      return NextResponse.json({ ok: true });
    }

    if (text?.startsWith("/disco")) {
      if (!user) {
        await sendMessage({
          chatId,
          text: "Please use /start first.",
        });
        return NextResponse.json({ ok: true });
      }

      await sendMessage({
        chatId,
        text: "Select your DISCO ⚡",
        keyboard: discosList.map((disco) => [
          {
            text: disco,
            callback_data: `DISCO_${disco}`,
          },
        ]),
      });

      return NextResponse.json({ ok: true });
    }

    if (text?.startsWith("/status")) {
      if (!user) {
        await sendMessage({
          chatId,
          text: "Please use /start first.",
        });
        return NextResponse.json({ ok: true });
      }

      const disco = await getDisco(user.disco);
      await sendMessage({
        chatId,
        text: `⚡ Live load update for *${user.disco}*:\n*${disco?.load} MW*`,
      });

      return NextResponse.json({ ok: true });
    }

    await sendMessage({
      chatId,
      text: "Please use /start to begin.",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false });
  }
}
