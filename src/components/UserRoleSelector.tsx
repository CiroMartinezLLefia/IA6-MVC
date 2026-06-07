"use client";

import { useState, useTransition } from "react";
import { updateUserRole } from "@/actions/admin";

interface UserRoleSelectorProps {
  userId: string;
  currentRole: "USER" | "EDITOR" | "ADMIN";
}

export default function UserRoleSelector({ userId, currentRole }: UserRoleSelectorProps) {
  const [role, setRole] = useState(currentRole);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as "USER" | "EDITOR" | "ADMIN";
    setError(null);

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (res.error) {
        setError(res.error);
        // Restablir el valor del select a l'estat anterior
        e.target.value = role;
      } else {
        setRole(newRole);
      }
    });
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }}>
      <select
        className="form-select"
        style={{ padding: "0.35rem 0.75rem", fontSize: "0.85rem", width: "120px" }}
        value={role}
        onChange={handleChange}
        disabled={isPending}
      >
        <option value="USER">USER</option>
        <option value="EDITOR">EDITOR</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      {error && (
        <span 
          className="error-message" 
          style={{ fontSize: "0.75rem", maxWidth: "200px", textAlign: "right" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
