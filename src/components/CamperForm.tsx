"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CamperFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    pricePerDay: number;
    passengers: number;
    beds: number;
    engine: string;
    transmission: string;
    imageUrl: string;
  };
  action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  submitText: string;
}

export default function CamperForm({ initialData, action, submitText }: CamperFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const res = await action(formData);

    setIsPending(false);
    if (res.error) {
      setError(res.error);
    } else if (res.success) {
      router.push("/backoffice/models");
      router.refresh();
    }
  };

  return (
    <div className="glass-panel" style={{ padding: "2.5rem", maxWidth: "700px", margin: "0 auto" }}>
      {error && (
        <div className="alert alert-error" style={{ marginBottom: "1.5rem" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nom de la Camper</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            defaultValue={initialData?.name}
            placeholder="Ex: Mercedes-Benz Marco Polo"
            required
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Descripció</label>
          <textarea
            id="description"
            name="description"
            className="form-input form-textarea"
            defaultValue={initialData?.description}
            placeholder="Descripció completa del vehicle, equipament i prestacions..."
            required
            disabled={isPending}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div className="form-group">
            <label htmlFor="pricePerDay" className="form-label">Preu per Dia (€)</label>
            <input
              type="number"
              step="0.01"
              id="pricePerDay"
              name="pricePerDay"
              className="form-input"
              defaultValue={initialData?.pricePerDay}
              placeholder="Ex: 120"
              required
              disabled={isPending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL de la Imatge</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="form-input"
              defaultValue={initialData?.imageUrl}
              placeholder="Ex: /images/marco-polo.jpg"
              disabled={isPending}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div className="form-group">
            <label htmlFor="passengers" className="form-label">Places Homologades (Viatjar)</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              className="form-input"
              defaultValue={initialData?.passengers ?? 4}
              required
              disabled={isPending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="beds" className="form-label">Places per Dormir (Llits)</label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="form-input"
              defaultValue={initialData?.beds ?? 4}
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div className="form-group">
            <label htmlFor="engine" className="form-label">Motorització</label>
            <input
              type="text"
              id="engine"
              name="engine"
              className="form-input"
              defaultValue={initialData?.engine}
              placeholder="Ex: 2.0d 163 CV"
              required
              disabled={isPending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="transmission" className="form-label">Tipus de Canvi</label>
            <select
              id="transmission"
              name="transmission"
              className="form-select"
              defaultValue={initialData?.transmission || "Automàtic"}
              required
              disabled={isPending}
            >
              <option value="Automàtic">Automàtic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => router.push("/backoffice/models")}
            disabled={isPending}
          >
            Cancel·lar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Desant..." : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
