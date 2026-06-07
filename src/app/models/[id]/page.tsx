import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import CommentForm from "@/components/CommentForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CamperDetailPage({ params }: PageProps) {
  const { id } = await params;

  const camper = await prisma.camperModel.findUnique({
    where: { id },
    include: {
      comments: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!camper) {
    notFound();
  }

  const session = await auth();
  const user = session?.user;

  return (
    <section className="section" style={{ minHeight: "80vh", paddingTop: "3rem" }}>
      <div className="container">
        {/* Enllaç de retorn */}
        <Link 
          href="/" 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            color: "var(--text-secondary)", 
            marginBottom: "2rem", 
            textDecoration: "none", 
            fontSize: "0.95rem" 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Tornar a l'inici
        </Link>

        {/* Graella Principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          
          {/* Informació de Capçalera del Vehicle */}
          <div>
            <h1 className="section-title" style={{ marginBottom: "0.5rem" }}>{camper.name}</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Característiques, disponibilitat i comentaris del model.
            </p>
          </div>
          
          {/* Imatge de Portada */}
          <div 
            style={{ 
              borderRadius: "var(--radius-lg)", 
              overflow: "hidden", 
              height: "450px", 
              position: "relative", 
              border: "1px solid var(--border-glass)" 
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={camper.imageUrl}
              alt={camper.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem" }}>
              <span 
                className="badge badge-primary" 
                style={{ 
                  fontSize: "1.1rem", 
                  padding: "0.6rem 1.2rem", 
                  backdropFilter: "blur(8px)", 
                  background: "rgba(9, 10, 15, 0.85)" 
                }}
              >
                {camper.pricePerDay}€ / dia (orientatiu)
              </span>
            </div>
          </div>

          {/* Especificacions Tècniques */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600", marginBottom: "0.5rem" }}>Places</div>
              <div style={{ fontSize: "1.4rem", fontWeight: "700" }}>{camper.passengers} Viatjar/Dormir</div>
            </div>
            <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600", marginBottom: "0.5rem" }}>Llits</div>
              <div style={{ fontSize: "1.4rem", fontWeight: "700" }}>{camper.beds} Llits de viatge</div>
            </div>
            <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600", marginBottom: "0.5rem" }}>Canvi</div>
              <div style={{ fontSize: "1.4rem", fontWeight: "700" }}>{camper.transmission}</div>
            </div>
            <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600", marginBottom: "0.5rem" }}>Motor</div>
              <div style={{ fontSize: "1.4rem", fontWeight: "700" }}>{camper.engine}</div>
            </div>
          </div>

          {/* Descripció Ampliada */}
          <div className="glass-panel" style={{ padding: "2.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "700", marginBottom: "1.25rem" }}>Descripció del Vehicle</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1.05rem" }}>
              {camper.description}
            </p>
          </div>

          {/* Secció de Comentaris */}
          <div className="glass-panel" style={{ padding: "2.5rem" }}>
            <h2 
              style={{ 
                fontSize: "1.6rem", 
                fontWeight: "700", 
                marginBottom: "2rem", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}
            >
              <span>Opinions dels Viatgers</span>
              <span className="badge badge-secondary" style={{ fontSize: "0.85rem" }}>
                {camper.comments.length} opinions
              </span>
            </h2>

            {/* Llistat de comentaris en format scrollable si n'hi ha molts */}
            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "1.5rem", 
                maxHeight: "500px", 
                overflowY: "auto", 
                paddingRight: "0.5rem", 
                marginBottom: "2.5rem" 
              }}
            >
              {camper.comments.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", padding: "3rem 0" }}>
                  Encara no hi ha cap comentari per a aquesta camper. Sigues el primer a deixar la teva opinió!
                </p>
              ) : (
                camper.comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    style={{ 
                      padding: "1.25rem", 
                      borderRadius: "var(--radius-md)", 
                      background: "rgba(5, 6, 8, 0.4)",
                      border: "1px solid var(--border-glass)" 
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                          {comment.user.name || comment.user.email}
                        </span>
                        {comment.user.role !== "USER" && (
                          <span className="badge badge-primary" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
                            {comment.user.role}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {new Date(comment.createdAt).toLocaleDateString("ca-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Caixa d'escriptura (protegida per inici de sessió) */}
            <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "2rem" }}>
              {user ? (
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                    Publica la teva opinió
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                    Comentant com a <strong>{user.name || user.email}</strong> ({(user as any).role}).
                  </p>
                  <CommentForm camperModelId={camper.id} />
                </div>
              ) : (
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: "2rem", 
                    textAlign: "center", 
                    backgroundColor: "rgba(245, 158, 11, 0.02)", 
                    borderColor: "rgba(245, 158, 11, 0.1)" 
                  }}
                >
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                    Només els viatgers registrats poden escriure comentaris de les campers.
                  </p>
                  <Link 
                    href={`/auth/login?callbackUrl=/models/${camper.id}`} 
                    className="btn btn-primary btn-sm"
                  >
                    Iniciar Sessió per Comentar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
