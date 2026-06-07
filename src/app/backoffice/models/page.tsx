import { prisma } from "@/db/prisma";
import Link from "next/link";
import { deleteCamperModel } from "@/actions/camper";

export default async function BackofficeModelsPage() {
  const campers = await prisma.camperModel.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="glass-panel" style={{ padding: "2.5rem" }}>
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "2rem", 
          flexWrap: "wrap", 
          gap: "1rem" 
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Gestionar la Flota</h2>
        <Link href="/backoffice/models/new" className="btn btn-primary btn-sm">
          Afegir Nova Camper
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-glass)", color: "var(--text-secondary)" }}>
              <th style={{ padding: "1rem" }}>Imatge</th>
              <th style={{ padding: "1rem" }}>Nom</th>
              <th style={{ padding: "1rem" }}>Preu/Dia</th>
              <th style={{ padding: "1rem" }}>Capacitat</th>
              <th style={{ padding: "1rem" }}>Motorització</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Accions</th>
            </tr>
          </thead>
          <tbody>
            {campers.length === 0 ? (
              <tr>
                <td 
                  colSpan={6} 
                  style={{ 
                    padding: "3rem", 
                    fontStyle: "italic", 
                    textAlign: "center", 
                    color: "var(--text-muted)" 
                  }}
                >
                  No hi ha cap camper guardada al sistema.
                </td>
              </tr>
            ) : (
              campers.map((camper) => (
                <tr 
                  key={camper.id} 
                  style={{ borderBottom: "1px solid var(--border-glass)", transition: "background-color 0.2s" }}
                >
                  <td style={{ padding: "1rem" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={camper.imageUrl}
                      alt={camper.name}
                      style={{ 
                        width: "80px", 
                        height: "50px", 
                        objectFit: "cover", 
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-glass)"
                      }}
                    />
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "600" }}>{camper.name}</td>
                  <td style={{ padding: "1rem" }}>{camper.pricePerDay}€</td>
                  <td style={{ padding: "1rem" }}>
                    {camper.passengers} pl. / {camper.beds} llits
                  </td>
                  <td style={{ padding: "1rem", color: "var(--text-secondary)" }}>
                    {camper.engine} | {camper.transmission}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <div 
                      style={{ 
                        display: "inline-flex", 
                        gap: "0.5rem", 
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <Link 
                        href={`/backoffice/models/${camper.id}/edit`} 
                        className="btn btn-outline btn-sm" 
                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                      >
                        Editar
                      </Link>
                      
                      <form 
                        action={async () => {
                          "use server";
                          await deleteCamperModel(camper.id);
                        }}
                      >
                        <button 
                          type="submit" 
                          className="btn btn-danger btn-sm" 
                          style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
