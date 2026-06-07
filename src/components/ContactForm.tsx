"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactRequest } from "@/actions/contact";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactRequest, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <div className="glass-panel" style={{ padding: "2.5rem", maxWidth: "600px", margin: "0 auto" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
        Envia'ns una consulta
      </h3>
      
      {state.success && (
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          La teva sol·licitud s'ha enviat correctament! Ens posarem en contacte el més aviat possible.
        </div>
      )}

      {state.message && state.error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {state.message}
        </div>
      )}

      <form action={formAction} ref={formRef} noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nom Complet</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="El teu nom"
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
            disabled={isPending}
          />
          {state.errors?.email && (
            <span className="error-message">{state.errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Missatge o Consulta</label>
          <textarea
            id="message"
            name="message"
            className="form-input form-textarea"
            placeholder="Explica'ns en quines dates voldries viatjar i quin model t'interessa..."
            disabled={isPending}
          />
          {state.errors?.message && (
            <span className="error-message">{state.errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={isPending}
        >
          {isPending ? "Enviant..." : "Enviar Sol·licitud"}
        </button>
      </form>
    </div>
  );
}
