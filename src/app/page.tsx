import Link from "next/link";
import { prisma } from "@/db/prisma";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  const campers = await prisma.camperModel.findMany({
    orderBy: { pricePerDay: "asc" }
  });

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section"
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: "linear-gradient(to bottom, rgba(9, 10, 15, 0.4) 0%, rgba(5, 6, 8, 0.95) 100%), url('/images/hero-camper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "6rem 0",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span 
            className="badge badge-primary" 
            style={{ marginBottom: "1.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            Llibertat sense límits
          </span>
          <h1 
            style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
              fontWeight: 800, 
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #ffffff 30%, var(--primary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Troba la camper perfecte per al teu viatge
          </h1>
          <p 
            style={{ 
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)", 
              color: "var(--text-secondary)", 
              marginBottom: "2.5rem",
              lineHeight: 1.6
            }}
          >
            Lloga furgonetes camper de disseny i gamma alta. Totes inclouen bany amb dutxa calenta, cuina completa i assistència a la carretera per a una total independència.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="#cataleg" className="btn btn-primary">
              Explorar la Flota
            </Link>
            <Link href="#contacte" className="btn btn-outline">
              Demanar Informació
            </Link>
          </div>
        </div>
      </section>

      {/* Proposta de Valor / Features */}
      <section className="section" style={{ backgroundColor: "rgba(5, 6, 8, 0.6)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">Serveis Premium Inclosos</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Dissenyades per oferir-te la màxima autonomia i comoditat per a viatges llargs o escapades curtes.
            </p>
          </div>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div className="glass-panel" style={{ padding: "2.5rem", flex: "1 1 300px" }}>
              <div style={{ 
                color: "var(--primary)", 
                marginBottom: "1.5rem",
                display: "inline-flex",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(245, 158, 11, 0.1)"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M12 22v-4"/><path d="M12 10V6"/><circle cx="12" cy="14" r="2"/></svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>Totalment Equipades</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Bany interior amb dutxa calenta, cuina de gas, nevera de compressor i calefacció estacionària per a qualsevol època de l'any.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "2.5rem", flex: "1 1 300px" }}>
              <div style={{ 
                color: "var(--secondary)", 
                marginBottom: "1.5rem",
                display: "inline-flex",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(20, 184, 166, 0.1)"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>Assegurança a Tot Risc</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Viatja sense preocupacions. Assegurança a tot risc amb franquícia baixa i assistència en viatge 24h a tota Europa inclosa.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "2.5rem", flex: "1 1 300px" }}>
              <div style={{ 
                color: "var(--primary)", 
                marginBottom: "1.5rem",
                display: "inline-flex",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(245, 158, 11, 0.1)"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>Sense Quilometratge</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                A partir de 7 dies de lloguer gaudeix de quilometratge il·limitat per arribar tan lluny com desitgis sense càrrecs extres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catàleg / La Flota */}
      <section className="section" id="cataleg">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">La Nostra Flota de Campers</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Vehicles de darrera generació amb excel·lent dinàmica de conducció i màxim aprofitament de l'espai.
            </p>
          </div>

          <div className="grid-cards">
            {campers.map((camper) => (
              <div 
                key={camper.id} 
                className="glass-panel" 
                style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                <div style={{ position: "relative", height: "240px", width: "100%", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={camper.imageUrl}
                    alt={camper.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
                    <span 
                      className="badge badge-primary" 
                      style={{ 
                        fontSize: "0.9rem", 
                        padding: "0.5rem 1rem", 
                        backdropFilter: "blur(8px)", 
                        background: "rgba(9, 10, 15, 0.85)" 
                      }}
                    >
                      {camper.pricePerDay}€ / dia
                    </span>
                  </div>
                </div>

                <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                    {camper.name}
                  </h3>
                  <p 
                    style={{ 
                      color: "var(--text-secondary)", 
                      fontSize: "0.95rem", 
                      lineHeight: 1.5, 
                      marginBottom: "1.5rem", 
                      flexGrow: 1 
                    }}
                  >
                    {camper.description.length > 140 ? `${camper.description.substring(0, 140)}...` : camper.description}
                  </p>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "0.75rem", 
                    marginBottom: "1.5rem",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    borderTop: "1px solid var(--border-glass)",
                    paddingTop: "1.25rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <span>{camper.passengers} Viatjar / Dormir</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><circle cx="6" cy="13" r="2"/><circle cx="16" cy="13" r="2"/></svg>
                      <span>{camper.beds} Llits de viatge</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      <span>Canvi {camper.transmission}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      <span>Motor {camper.engine}</span>
                    </div>
                  </div>

                  <Link href={`/models/${camper.id}`} className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                    Veure Detalls i Comentaris
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulari de Contacte */}
      <section 
        className="section" 
        id="contacte" 
        style={{ 
          backgroundColor: "rgba(5, 6, 8, 0.6)", 
          borderTop: "1px solid var(--border-glass)" 
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">Tens algun dubte?</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Envia'ns el teu formulari i t'ajudarem a planificar la teva escapada perfecta en qüestió d'hores.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
