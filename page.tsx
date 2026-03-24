"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"erro">("idle");
  const [msg, setMsg] = useState("");

  async function testar() {
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/test", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setStatus("erro"); setMsg(data.error); return; }
      setStatus("ok");
      setMsg(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setStatus("erro");
      setMsg(e.message);
    }
  }

  return (
    <main style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace" }}>
      <div style={{ width:"100%", maxWidth:"480px", padding:"2rem" }}>
        <h1 style={{ color:"#D9FF3F", fontSize:"1.4rem", marginBottom:"0.4rem" }}>INFLUEX AI</h1>
        <p style={{ color:"#666", fontSize:"0.85rem", marginBottom:"2rem" }}>Teste de conexão com a API Replicate</p>

        <button
          onClick={testar}
          disabled={status === "loading"}
          style={{ width:"100%", background: status==="loading" ? "#333" : "#D9FF3F", color:"#000", border:"none", borderRadius:"8px", padding:"0.9rem", fontSize:"1rem", fontWeight:"700", cursor: status==="loading" ? "default" : "pointer" }}
        >
          {status === "loading" ? "⏳ Chamando API..." : "🔌 Testar API"}
        </button>

        {status === "loading" && (
          <p style={{ color:"#888", marginTop:"1.5rem", textAlign:"center" }}>Aguardando resposta da Replicate...</p>
        )}

        {status === "ok" && (
          <div style={{ marginTop:"1.5rem", background:"#0d1a0d", border:"1px solid #D9FF3F", borderRadius:"8px", padding:"1rem" }}>
            <p style={{ color:"#D9FF3F", marginBottom:"0.5rem" }}>✅ Sucesso!</p>
            <pre style={{ color:"#aaa", fontSize:"0.75rem", margin:0, overflow:"auto" }}>{msg}</pre>
          </div>
        )}

        {status === "erro" && (
          <div style={{ marginTop:"1.5rem", background:"#1a0d0d", border:"1px solid #ff4444", borderRadius:"8px", padding:"1rem" }}>
            <p style={{ color:"#ff6666", marginBottom:"0.25rem" }}>❌ Erro</p>
            <p style={{ color:"#ff9999", fontSize:"0.85rem", margin:0 }}>{msg}</p>
          </div>
        )}
      </div>
    </main>
  );
}
