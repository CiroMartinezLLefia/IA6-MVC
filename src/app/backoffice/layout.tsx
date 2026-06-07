import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  // Control d'accés de seguretat (UC-10)
  if (!user || ((user as any).role !== "ADMIN" && (user as any).role !== "EDITOR")) {
    redirect("/?error=no-permission");
  }

  const role = (user as any).role;

  return (
    <section className="section" style={{ minHeight: "80vh", paddingTop: "3rem" }}>
      <div className="container">
        
        {/* Capçalera del Backoffice */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            borderBottom: "1px solid var(--border-glass)", 
            paddingBottom: "1.5rem", 
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div>
            <h1 className="section-title" style={{ margin: 0, fontSize: "2rem" }}>
              Panell de Backoffice
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
              Gestió interna de la landing. Connectat com a <strong>{user.name || user.email}</strong>.
            </p>
          </div>
          <span className="badge badge-primary" style={{ padding: "0.5rem 1rem" }}>
            Rol: {role}
          </span>
        </div>

        {/* Subnavegació de Backoffice */}
        <div 
          style={{ 
            display: "flex", 
            gap: "1rem", 
            marginBottom: "2.5rem", 
            borderBottom: "1px solid rgba(255,255,255,0.05)", 
            paddingBottom: "1rem", 
            flexWrap: "wrap" 
          }}
        >
          <Link href="/backoffice/models" className="btn btn-outline btn-sm">
            Gestionar Campers
          </Link>
          {role === "ADMIN" && (
            <>
              <Link href="/backoffice/users" className="btn btn-outline btn-sm">
                Gestionar Usuaris
              </Link>
              <Link href="/backoffice/contacts" className="btn btn-outline btn-sm">
                Consultes de Contacte
              </Link>
            </>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
