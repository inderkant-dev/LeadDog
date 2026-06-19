import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = createServerSupabase();

    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const [{ data: replies }, { data: followups }] = await Promise.all([
      supabase
        .from("lead_replies")
        .select("*")
        .eq("lead_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("followups")
        .select("*")
        .eq("lead_id", id)
        .order("created_at", { ascending: false }),
    ]);

    return NextResponse.json({
      lead,
      replies: replies || [],
      followups: followups || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch lead.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updates: Record<string, string> = {};

    if (body.status) updates.status = body.status;
    if (body.assigned_to) updates.assigned_to = body.assigned_to;
    if (body.assignedTo) updates.assigned_to = body.assignedTo;

    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ lead: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update lead.",
      },
      { status: 500 },
    );
  }
}
