import Link from "next/link";
import { auth } from "@/auth";
import NavAuthClient from "@/components/NavAuthClient";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--primary)" }}
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-5.172a2 2 0 0 0-.586-1.414l-2.828-2.828A2 2 0 0 0 16.172 7H14" />
            <circle cx="7.5" cy="18.5" r="2.5" />
            <circle cx="16.5" cy="18.5" r="2.5" />
          </svg>
          Camper<span>Rent</span>
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">
            Inici
          </Link>
          <Link href="/#cataleg" className="nav-link">
            La Flota
          </Link>
          <Link href="/#contacte" className="nav-link">
            Contacte
          </Link>
          {user && ((user as any).role === "ADMIN" || (user as any).role === "EDITOR") && (
            <Link href="/backoffice" className="nav-link">
              Backoffice
            </Link>
          )}
        </div>

        <NavAuthClient user={user} />
      </div>
    </nav>
  );
}
