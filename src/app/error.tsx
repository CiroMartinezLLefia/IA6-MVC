"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("S'ha capturat un error crític:", error);
  }, [error]);

  return (
    <section 
      className="section" 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "80vh" 
      }}
    >
      <div className="container" style={{ maxWidth: "550px" }}>
        <div 
          className="glass-panel" 
          style={{ 
            padding: "3rem", 
            textAlign: "center", 
            border: "1px solid rgba(239, 68, 68, 0.2)" 
          }}
        >
          <div style={{ color: "var(--error)", marginBottom: "1.5rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1rem" }}>
            Error de Connexió
          </h1>
          
          <p style={{ color: "var(--text-secondary)", fontSize: "0.975rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            No s'ha pogut establir la connexió amb la base de dades. Pot ser a causa d'una caiguda de servei temporal o problemes amb la xarxa. Si us plau, torna-ho a provar d'aquí a uns instants.
          </p>

          <div 
            style={{
              background: "rgba(5, 6, 8, 0.5)",
              border: "1px solid var(--border-glass)",
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              textAlign: "left",
              fontFamily: "monospace",
              wordBreak: "break-all",
              marginBottom: "2.5rem"
            }}
          >
            {error.message || "Error de base de dades desconegut"}
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button onClick={reset} className="btn btn-primary">
              Tornar a provar
            </button>
            <Link href="/" className="btn btn-outline">
              Tornar a l'inici
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
