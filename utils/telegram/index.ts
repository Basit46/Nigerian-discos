import { Disco } from "@/types";
import axios from "axios";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

export const sendMessage = async ({
  chatId,
  text,
  keyboard,
}: {
  chatId: number;
  text: string;
  keyboard?: any;
}) => {
  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        reply_markup: keyboard
          ? {
              inline_keyboard: keyboard,
            }
          : undefined,
      }),
    });
  } catch (error) {
    console.error("Telegram sendMessage error:", error);
  }
};

export const getDisco = async (discoId: string) => {
  const res = await axios.get(`https://nigerian-discos.vercel.app/api`);
  return (res.data as Disco[]).find(
    (d) => d.discoName.toLowerCase() === discoId.toLowerCase(),
  );
};

export const formatLowLoadMessage = (disco: string, load: number) => `
🚨 *Low Power Alert*

📍 Disco: *${disco}*
⚡ Current Load: *${load} MW*

⚠️ Load has dropped below normal levels. 
Expect possible outages or reduced supply.

Stay prepared.
`;
