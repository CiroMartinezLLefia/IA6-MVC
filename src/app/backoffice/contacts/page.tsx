import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { toggleContactRequestStatus } from "@/actions/admin";

export default async function BackofficeContactsPage() {
  const session = await auth();
  const user = session?.user;

  // Control de seguretat (UC-09 i UC-10)
  if (!user || (user as any).role !== "ADMIN") {
    redirect("/?error=no-permission");
  }

  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="glass-panel" style={{ padding: "2.5rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "2rem" }}>
        Gestió de Consultes de Contacte
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {contacts.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", padding: "3.5rem 0" }}>
            No hi ha cap sol·licitud de contacte guardada.
          </p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                padding: "2rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(5, 6, 8, 0.4)",
                border: "1px solid var(--border-glass)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
              }}
            >
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start", 
                  flexWrap: "wrap", 
                  gap: "1rem" 
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "700", margin: 0 }}>
                    {contact.name}
                  </h3>
                  <a 
                    href={`mailto:${contact.email}`} 
                    style={{ color: "var(--primary)", fontSize: "0.9rem", textDecoration: "underline" }}
                  >
                    {contact.email}
                  </a>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                  <span 
                    className={`badge ${contact.status === "PENDING" ? "badge-primary" : "badge-secondary"}`}
                    style={{ padding: "0.35rem 0.75rem" }}
                  >
                    {contact.status === "PENDING" ? "Pendent" : "Resolta"}
                  </span>
                  
                  <form 
                    action={async () => {
                      "use server";
                      await toggleContactRequestStatus(contact.id, contact.status);
                    }}
                  >
                    <button type="submit" className="btn btn-outline btn-sm">
                      {contact.status === "PENDING" ? "Marcar com a Resolta" : "Marcar com a Pendent"}
                    </button>
                  </form>
                </div>
              </div>

              <p 
                style={{ 
                  color: "var(--text-secondary)", 
                  fontSize: "0.975rem", 
                  lineHeight: 1.6, 
                  margin: 0, 
                  whiteSpace: "pre-wrap" 
                }}
              >
                {contact.message}
              </p>

              <span 
                style={{ 
                  fontSize: "0.8rem", 
                  color: "var(--text-muted)", 
                  alignSelf: "flex-end",
                  borderTop: "1px solid rgba(255,255,255,0.02)",
                  width: "100%",
                  textAlign: "right",
                  paddingTop: "0.75rem",
                  marginTop: "0.5rem"
                }}
              >
                Rebuda el: {new Date(contact.createdAt).toLocaleString("ca-ES")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
