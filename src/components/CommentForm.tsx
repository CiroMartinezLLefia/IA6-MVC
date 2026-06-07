"use client";

import { useState, useTransition } from "react";
import { createComment } from "@/actions/comment";

interface CommentFormProps {
  camperModelId: string;
}

export default function CommentForm({ camperModelId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("El comentari no pot estar buit.");
      return;
    }

    startTransition(async () => {
      const result = await createComment(camperModelId, content);
      if (result.error) {
        setError(result.error);
      } else {
        setContent("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      {error && (
        <div className="alert alert-error" style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}
      
      <div className="form-group">
        <textarea
          id="comment-content"
          className="form-input"
          style={{ minHeight: "80px", fontSize: "0.925rem" }}
          placeholder="Què et sembla aquest model? Explica'ns la teva experiència..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={isPending}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {isPending ? "Publicant..." : "Publicar Comentari"}
      </button>
    </form>
  );
}
