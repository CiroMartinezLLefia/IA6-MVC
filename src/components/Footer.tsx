import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <Link href="/" className="logo" style={{ fontSize: "1.25rem" }}>
          Camper<span>Rent</span>
        </Link>
        <p style={{ margin: "0.5rem 0", color: "var(--text-secondary)" }}>
          Troba la llibertat sobre rodes. Lloguer de furgonetes camper de gamma alta.
        </p>
        <div className="footer-links">
          <Link href="/" className="footer-link">Inici</Link>
          <Link href="/#cataleg" className="footer-link">La Flota</Link>
          <Link href="/#contacte" className="footer-link">Contacte</Link>
          <Link href="/politica-privacitat" className="footer-link">Privacitat</Link>
        </div>
        <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          &copy; {new Date().getFullYear()} CamperRent. Tots els drets reservats. Projecte de pràctiques IA6 MVC.
        </div>
      </div>
    </footer>
  );
}
