import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "REPLICATE_API_TOKEN nao configurado" }, { status: 500 });
  }
  try {
    const res = await fetch("https://api.replicate.com/v1/models", {
      headers: { Authorization: "Token " + token },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Replicate erro: " + res.status }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json({
      ok: true,
      mensagem: "API Replicate conectada com sucesso!",
      modelos: data.results ? data.results.length : 0,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
