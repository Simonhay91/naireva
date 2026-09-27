/**
 * Telegram Bot API notifications — the primary "new lead" alert channel.
 * Without TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID set, messages are logged to the
 * console instead of sent, same fallback pattern as src/lib/email.ts, so the
 * consultation flow never depends on this being configured.
 */

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("\n[telegram:dev] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID not configured — logging instead of sending:");
    console.log(text);
    return { delivered: false, dev: true };
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error ${res.status}: ${body}`);
  }

  return { delivered: true, dev: false };
}

export async function notifyTeamOfNewLeadTelegram(params: {
  leadId: string;
  fullName: string;
  country: string;
  procedure?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  telegramHandle?: string | null;
  email?: string | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "";

  const lines = [
    "<b>New consultation lead</b>",
    `Name: ${escapeHtml(params.fullName)}`,
    `Country: ${escapeHtml(params.country)}`,
    `Procedure: ${escapeHtml(params.procedure ?? "Not specified")}`
  ];
  if (params.phone) lines.push(`Phone: ${escapeHtml(params.phone)}`);
  if (params.whatsapp) lines.push(`WhatsApp: ${escapeHtml(params.whatsapp)}`);
  if (params.telegramHandle) lines.push(`Telegram: ${escapeHtml(params.telegramHandle)}`);
  if (params.email) lines.push(`Email: ${escapeHtml(params.email)}`);
  lines.push(`Lead ID: ${params.leadId}`);
  lines.push(`Open: ${baseUrl}/admin/leads/${params.leadId}`);

  await sendTelegramMessage(lines.join("\n"));
}
