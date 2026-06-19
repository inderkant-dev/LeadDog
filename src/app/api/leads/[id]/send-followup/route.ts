import { NextResponse } from "next/server";
import { followupEmail } from "@/lib/emails";
import { sendTransactionalEmail } from "@/lib/resend";
import { createServerSupabase } from "@/lib/supabase";
import type { Lead } from "@/types/lead";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const subject = String(body.subject || "Follow-up regarding your enquiry");
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Follow-up message is required." },
        { status: 400 },
      );
    }

    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const lead = data as Lead;
    const template = followupEmail(lead, message, subject);

    const emailResult = await sendTransactionalEmail({
      to: lead.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    await supabase.from("followups").insert({
      lead_id: lead.id,
      type: "Email",
      subject: template.subject,
      message,
      status: emailResult.ok ? "Sent" : "Failed",
      sent_at: emailResult.ok ? new Date().toISOString() : null,
    });

    await supabase
      .from("leads")
      .update({
        status: "Contacted",
      })
      .eq("id", lead.id);

    return NextResponse.json({
      ok: true,
      email: emailResult,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send follow-up.",
      },
      { status: 500 },
    );
  }
}
