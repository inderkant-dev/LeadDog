import type { Lead } from "@/types/lead";

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export function acknowledgementEmail(lead: Lead) {
  const link = `${getAppUrl()}/follow-up/${lead.follow_up_token}`;

  const subject = "We received your enquiry | LeadDog";

  const text = `Hi ${lead.name},

Thank you for contacting us. We have received your enquiry:

"${lead.requirement}"

Our team will review your requirement and get back to you shortly.

You can update or reply to your request here:
${link}

Regards,
LeadDog Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:32px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden;">
        <div style="background:#0f172a; color:#ffffff; padding:24px 28px;">
          <h1 style="margin:0; font-size:22px;">LeadDog</h1>
          <p style="margin:8px 0 0; color:#cbd5e1;">Your enquiry has been received.</p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:16px; color:#0f172a;">Hi ${lead.name},</p>
          <p style="font-size:15px; color:#334155; line-height:1.7;">
            Thank you for contacting us. We have received your enquiry and our team will review it shortly.
          </p>

          <div style="background:#f1f5f9; border-radius:14px; padding:16px; margin:22px 0;">
            <p style="margin:0 0 8px; font-weight:700; color:#0f172a;">Your requirement</p>
            <p style="margin:0; color:#475569; line-height:1.6;">${lead.requirement}</p>
          </div>

          <a href="${link}" style="display:inline-block; background:#0f172a; color:#ffffff; text-decoration:none; padding:13px 18px; border-radius:12px; font-weight:700;">
            Reply / Update Requirement
          </a>

          <p style="font-size:13px; color:#64748b; margin-top:22px;">
            This secure link lets you continue the conversation directly inside LeadDog.
          </p>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export function followupEmail(lead: Lead, message: string, subject?: string) {
  const link = `${getAppUrl()}/follow-up/${lead.follow_up_token}`;

  const finalSubject = subject || `Follow-up regarding your enquiry | LeadDog`;

  const text = `Hi ${lead.name},

${message}

You can reply or update your requirement here:
${link}

Regards,
LeadDog Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:32px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden;">
        <div style="background:#0f172a; color:#ffffff; padding:24px 28px;">
          <h1 style="margin:0; font-size:22px;">LeadDog Follow-up</h1>
          <p style="margin:8px 0 0; color:#cbd5e1;">A quick update regarding your request.</p>
        </div>

        <div style="padding:28px;">
          <p style="font-size:16px; color:#0f172a;">Hi ${lead.name},</p>
          <p style="font-size:15px; color:#334155; line-height:1.7;">${message}</p>

          <a href="${link}" style="display:inline-block; background:#0f172a; color:#ffffff; text-decoration:none; padding:13px 18px; border-radius:12px; font-weight:700;">
            Reply to this Follow-up
          </a>
        </div>
      </div>
    </div>
  `;

  return { subject: finalSubject, text, html };
}
