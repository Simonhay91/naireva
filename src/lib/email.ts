import nodemailer from "nodemailer";

/**
 * Sends operational email (new-lead alerts to the team, optional status
 * updates to clients). When SMTP env vars are not configured — the default
 * in local dev — messages are logged to the console instead of sent, so the
 * consultation flow works out of the box without mail credentials.
 */

function transport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined
  });
}

export async function sendEmail(options: { to: string; subject: string; html: string; text?: string }) {
  const from = process.env.EMAIL_FROM || "NAIREVA <no-reply@naireva.com>";
  const t = transport();

  if (!t) {
    console.log("\n[email:dev] SMTP not configured — logging instead of sending:");
    console.log(`  to: ${options.to}\n  subject: ${options.subject}\n  ${options.text ?? options.html}\n`);
    return { delivered: false, dev: true };
  }

  await t.sendMail({ from, ...options });
  return { delivered: true, dev: false };
}

export async function notifyTeamOfNewLead(params: {
  leadId: string;
  fullName: string;
  country: string;
  procedure?: string | null;
  preferredContact: string;
}) {
  const to = process.env.TEAM_NOTIFICATION_EMAIL || "team@naireva.com";
  await sendEmail({
    to,
    subject: `New private consultation request — ${params.fullName}`,
    text: [
      `A new consultation request has arrived.`,
      `Name: ${params.fullName}`,
      `Country: ${params.country}`,
      `Procedure: ${params.procedure ?? "Not specified"}`,
      `Preferred contact: ${params.preferredContact}`,
      `Lead ID: ${params.leadId}`,
      `Open in admin: ${process.env.NEXT_PUBLIC_APP_URL ?? ""}/admin/leads/${params.leadId}`
    ].join("\n"),
    html: `<p>A new consultation request has arrived.</p>
      <ul>
        <li><b>Name:</b> ${params.fullName}</li>
        <li><b>Country:</b> ${params.country}</li>
        <li><b>Procedure:</b> ${params.procedure ?? "Not specified"}</li>
        <li><b>Preferred contact:</b> ${params.preferredContact}</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL ?? ""}/admin/leads/${params.leadId}">Open in admin</a></p>`
  });
}
