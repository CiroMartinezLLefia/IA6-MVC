"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginWithCredentials } from "@/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginWithCredentials, {});

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
      <div className="container" style={{ maxWidth: "450px" }}>
        <div className="glass-panel" style={{ padding: "2.5rem" }}>
          <h1 style={{ fontSize: "1.85rem", fontWeight: "700", marginBottom: "0.5rem", textAlign: "center" }}>
            Iniciar Sessió
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", textAlign: "center", marginBottom: "2rem" }}>
            Identifica't per poder reservar campers o escriure opinions.
          </p>

          {state.error && (
            <div 
              className="alert alert-error" 
              style={{ fontSize: "0.875rem", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {state.error}
            </div>
          )}

          <form action={formAction} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correu Electrònic</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="el-teu-correu@email.com"
                required
                disabled={isPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Contrasenya</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                required
                disabled={isPending}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              disabled={isPending}
            >
              {isPending ? "Identificant..." : "Iniciar Sessió"}
            </button>
          </form>

          <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            No tens un compte?{" "}
            <Link 
              href="/auth/register" 
              style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "underline" }}
            >
              Registra't aquí
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
