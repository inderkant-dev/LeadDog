import { NextResponse } from "next/server";
import { acknowledgementEmail } from "@/lib/emails";
import { detectIntent, detectPriority } from "@/lib/priority";
import { sendTransactionalEmail } from "@/lib/resend";
import { createServerSupabase } from "@/lib/supabase";
import { createFollowUpToken } from "@/lib/tokens";
import type { Lead } from "@/types/lead";

export async function GET() {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ leads: data || [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch leads.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const company = String(body.company || "").trim();
    const requirement = String(body.requirement || "").trim();

    if (!name || !email || !phone || !requirement) {
      return NextResponse.json(
        { error: "Name, email, phone, and requirement are required." },
        { status: 400 },
      );
    }

    const priority = detectPriority(requirement);
    const intent = detectIntent(requirement);
    const followUpToken = createFollowUpToken();

    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        company,
        requirement,
        source: "Website Chatbot",
        intent,
        priority,
        status: "New",
        assigned_to: null,
        follow_up_token: followUpToken,
      })
      .select("*")
      .single();

    if (error) throw error;

    const lead = data as Lead;
    const emailTemplate = acknowledgementEmail(lead);
    const emailResult = await sendTransactionalEmail({
      to: lead.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    await supabase.from("followups").insert({
      lead_id: lead.id,
      type: "Email",
      subject: emailTemplate.subject,
      message: "Automatic acknowledgement email sent after lead creation.",
      status: emailResult.ok ? "Sent" : "Failed",
      sent_at: emailResult.ok ? new Date().toISOString() : null,
    });

    return NextResponse.json({
      lead,
      email: emailResult,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create lead.",
      },
      { status: 500 },
    );
  }
}
