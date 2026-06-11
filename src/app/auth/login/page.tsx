"use client";

import { useActionState, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginWithCredentials } from "@/actions/auth";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [state, formAction, isPending] = useActionState(loginWithCredentials, {});
  const [activeTab, setActiveTab] = useState<"admin" | "editor" | "user">("admin");

  const credentialsMap = {
    admin: { email: "admin@campers.com", label: "Administrador" },
    editor: { email: "editor@campers.com", label: "Editor" },
    user: { email: "user@campers.com", label: "Client" }
  };

  const handleFill = (role: "admin" | "editor" | "user") => {
    setActiveTab(role);
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (emailInput && passwordInput) {
      emailInput.value = credentialsMap[role].email;
      passwordInput.value = "password123";
      
      // Visual feedback: brief highlight animation
      emailInput.style.borderColor = "var(--secondary)";
      passwordInput.style.borderColor = "var(--secondary)";
      setTimeout(() => {
        emailInput.style.borderColor = "";
        passwordInput.style.borderColor = "";
      }, 800);
    }
  };

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
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

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

          {/* Test credentials visual card */}
          <div 
            style={{ 
              marginTop: "2rem", 
              padding: "1.25rem", 
              borderRadius: "var(--radius-md)", 
              border: "1px dashed var(--border-glass)",
              background: "rgba(255, 255, 255, 0.02)",
              boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)"
            }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--primary)" }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Accés de Prova (Autofill)
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              {(["admin", "editor", "user"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleFill(role)}
                  className={`btn btn-sm ${activeTab === role ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1, padding: "0.4rem 0.5rem", fontSize: "0.8rem", height: "32px" }}
                >
                  {credentialsMap[role].label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Correu:</span>
                <strong style={{ color: "var(--text-primary)" }}>{credentialsMap[activeTab].email}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Contrasenya:</span>
                <strong style={{ color: "var(--text-primary)" }}>password123</strong>
              </div>
            </div>
          </div>

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

export default function LoginPage() {
  return (
    <Suspense fallback={
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
          <div className="glass-panel" style={{ padding: "2.5rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)" }}>Carregant formulari...</p>
          </div>
        </div>
      </section>
    }>
      <LoginForm />
    </Suspense>
  );
}
