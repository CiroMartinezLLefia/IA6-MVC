export default function Loading() {
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Hero Skeleton */}
      <section 
        className="section"
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 0",
        }}
      >
        <div 
          className="container" 
          style={{ 
            textAlign: "center", 
            maxWidth: "800px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "1.5rem" 
          }}
        >
          <div className="skeleton-pulse skeleton-box" style={{ width: "160px", height: "28px", borderRadius: "9999px" }} />
          <div className="skeleton-pulse skeleton-box" style={{ width: "80%", height: "56px" }} />
          <div className="skeleton-pulse skeleton-box" style={{ width: "90%", height: "40px" }} />
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className="skeleton-pulse skeleton-box" style={{ width: "140px", height: "46px", borderRadius: "12px" }} />
            <div className="skeleton-pulse skeleton-box" style={{ width: "140px", height: "46px", borderRadius: "12px" }} />
          </div>
        </div>
      </section>

      {/* Grid Cards Skeleton */}
      <section className="section" style={{ borderTop: "1px solid var(--border-glass)", backgroundColor: "rgba(5, 6, 8, 0.4)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
            <div className="skeleton-pulse skeleton-box" style={{ width: "260px", height: "36px" }} />
            <div className="skeleton-pulse skeleton-box" style={{ width: "380px", height: "20px" }} />
          </div>

          <div className="grid-cards">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="glass-panel" 
                style={{ overflow: "hidden", height: "480px", display: "flex", flexDirection: "column" }}
              >
                {/* Imatge Placeholder */}
                <div className="skeleton-pulse skeleton-box" style={{ height: "240px", width: "100%" }} />
                
                {/* Contingut Placeholder */}
                <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="skeleton-pulse skeleton-box" style={{ width: "70%", height: "24px" }} />
                  <div className="skeleton-pulse skeleton-box" style={{ width: "100%", height: "18px" }} />
                  <div className="skeleton-pulse skeleton-box" style={{ width: "90%", height: "18px" }} />
                  
                  {/* Línia separadora */}
                  <div style={{ borderTop: "1px solid var(--border-glass)", margin: "0.5rem 0" }} />
                  
                  {/* Badges Placeholder */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div className="skeleton-pulse skeleton-box" style={{ height: "16px" }} />
                    <div className="skeleton-pulse skeleton-box" style={{ height: "16px" }} />
                    <div className="skeleton-pulse skeleton-box" style={{ height: "16px" }} />
                    <div className="skeleton-pulse skeleton-box" style={{ height: "16px" }} />
                  </div>

                  <div 
                    className="skeleton-pulse skeleton-box" 
                    style={{ width: "100%", height: "40px", borderRadius: "12px", marginTop: "auto" }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
