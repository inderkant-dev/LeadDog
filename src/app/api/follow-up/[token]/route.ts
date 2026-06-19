import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ token: string }> | { token: string };
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("follow_up_token", token)
      .single();

    if (error) throw error;

    return NextResponse.json({ lead: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Invalid follow-up link.",
      },
      { status: 404 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;
    const body = await request.json();
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Reply message is required." },
        { status: 400 },
      );
    }

    const supabase = createServerSupabase();

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("follow_up_token", token)
      .single();

    if (leadError) throw leadError;

    const { error: replyError } = await supabase.from("lead_replies").insert({
      lead_id: lead.id,
      message,
    });

    if (replyError) throw replyError;

    await supabase
      .from("leads")
      .update({
        status: "Customer Replied",
      })
      .eq("id", lead.id);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit reply.",
      },
      { status: 500 },
    );
  }
}
