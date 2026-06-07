import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserRoleSelector from "@/components/UserRoleSelector";

export default async function BackofficeUsersPage() {
  const session = await auth();
  const user = session?.user;

  // Control de seguretat estricte per a ADMIN (UC-09 i UC-10)
  if (!user || (user as any).role !== "ADMIN") {
    redirect("/?error=no-permission");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="glass-panel" style={{ padding: "2.5rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "2.5rem" }}>
        Administració d'Usuaris i Rols
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-glass)", color: "var(--text-secondary)" }}>
              <th style={{ padding: "1rem" }}>Nom</th>
              <th style={{ padding: "1rem" }}>Correu Electrònic</th>
              <th style={{ padding: "1rem" }}>Data de Registre</th>
              <th style={{ padding: "1rem" }}>Rol Actual</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Modificar Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr 
                key={u.id} 
                style={{ borderBottom: "1px solid var(--border-glass)", transition: "background-color 0.2s" }}
              >
                <td style={{ padding: "1rem", fontWeight: "600" }}>{u.name || "Sense Nom"}</td>
                <td style={{ padding: "1rem" }}>{u.email}</td>
                <td style={{ padding: "1rem", color: "var(--text-secondary)" }}>
                  {new Date(u.createdAt).toLocaleDateString("ca-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span className="badge badge-secondary">{u.role}</span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <UserRoleSelector userId={u.id} currentRole={u.role as any} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
