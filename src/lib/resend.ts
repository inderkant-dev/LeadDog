import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || "LeadDog <onboarding@resend.dev>";
}

export async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    return {
      ok: false,
      skipped: true,
      error: "RESEND_API_KEY is missing. Email skipped.",
    };
  }

  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  if (error) {
    return {
      ok: false,
      skipped: false,
      error: error.message,
    };
  }

  return {
    ok: true,
    skipped: false,
    data,
  };
}
