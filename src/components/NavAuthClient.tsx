"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/actions/auth";

interface NavAuthClientProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
}

export default function NavAuthClient({ user }: NavAuthClientProps) {
  const pathname = usePathname();

  // Create login URL with callbackUrl parameter to redirect back
  const loginUrl = pathname ? `/auth/login?callbackUrl=${encodeURIComponent(pathname)}` : "/auth/login";

  return (
    <div className="nav-auth">
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>{user.name || user.email}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "bold" }}>
              {user.role}
            </div>
          </div>
          <form action={async () => {
            // Pass the current pathname so we can stay/redirect back correctly
            await handleSignOut(pathname || "/");
          }}>
            <button type="submit" className="btn btn-outline btn-sm">
              Sortir
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href={loginUrl} className="btn btn-outline btn-sm">
            Iniciar Sessió
          </Link>
          <Link href="/auth/register" className="btn btn-primary btn-sm">
            Registrar-se
          </Link>
        </div>
      )}
    </div>
  );
}
