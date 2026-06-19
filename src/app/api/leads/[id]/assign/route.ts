import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const assignedTo = String(body.assignedTo || "").trim() || null;

    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("leads")
      .update({
        assigned_to: assignedTo,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ lead: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to assign lead.",
      },
      { status: 500 },
    );
  }
}
