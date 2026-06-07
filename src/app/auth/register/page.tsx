"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/register";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, {});

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
          {state.success ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ color: "var(--secondary)", marginBottom: "1.5rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>Compte Creat!</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "0.95rem" }}>
                El teu compte s'ha registrat amb èxit. Ja pots iniciar sessió amb les teves credencials.
              </p>
              <Link 
                href="/auth/login" 
                className="btn btn-primary" 
                style={{ width: "100%", justifyContent: "center" }}
              >
                Iniciar Sessió
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: "1.85rem", fontWeight: "700", marginBottom: "0.5rem", textAlign: "center" }}>
                Registrar-se
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", textAlign: "center", marginBottom: "2rem" }}>
                Crea un compte nou per formar part de la comunitat CamperRent.
              </p>

              {state.message && (
                <div 
                  className="alert alert-error" 
                  style={{ fontSize: "0.875rem", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {state.message}
                </div>
              )}

              <form action={formAction} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nom Complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="El teu nom"
                    required
                    disabled={isPending}
                  />
                  {state.errors?.name && (
                    <span className="error-message">{state.errors.name}</span>
                  )}
                </div>

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
                  {state.errors?.email && (
                    <span className="error-message">{state.errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Contrasenya</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Almenys 6 caràcters"
                    required
                    disabled={isPending}
                  />
                  {state.errors?.password && (
                    <span className="error-message">{state.errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contrasenya</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Repeteix la contrasenya"
                    required
                    disabled={isPending}
                  />
                  {state.errors?.confirmPassword && (
                    <span className="error-message">{state.errors.confirmPassword}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
                  disabled={isPending}
                >
                  {isPending ? "Creant compte..." : "Registrar-se"}
                </button>
              </form>

              <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Ja tens un compte?{" "}
                <Link 
                  href="/auth/login" 
                  style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "underline" }}
                >
                  Inicia sessió aquí
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
