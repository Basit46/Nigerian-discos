import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = body.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text;

    console.log(message);

    let reply = `You said: ${text}`;

    if (text?.startsWith("/start")) {
      const firstName = message.from?.first_name || "there";
      reply = `Hello ${firstName}! Welcome.`;
    }

    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false });
  }
}
