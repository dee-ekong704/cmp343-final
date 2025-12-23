import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ feedback: data });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("feedback")
    .insert({
      class_name: String(body.class_name ?? "CMP 343"),
      mood: body.mood,
      rating: Number(body.rating),
      tags: Array.isArray(body.tags) ? body.tags : [],
      comment: String(body.comment ?? ""),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, item: data });
}
