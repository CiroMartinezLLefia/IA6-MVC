import { notFound } from "next/navigation";
import { prisma } from "@/db/prisma";
import CamperForm from "@/components/CamperForm";
import { updateCamperModel } from "@/actions/camper";

interface EditCamperPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCamperPage({ params }: EditCamperPageProps) {
  const { id } = await params;

  const camper = await prisma.camperModel.findUnique({
    where: { id },
  });

  if (!camper) {
    notFound();
  }

  // Enllaçar l'ID del model de camper a l'acció de modificació del servidor
  const updateCamperWithId = updateCamperModel.bind(null, id);

  return (
    <div>
      <h2 
        style={{ 
          fontSize: "1.5rem", 
          fontWeight: "700", 
          marginBottom: "1.5rem", 
          textAlign: "center" 
        }}
      >
        Editar Camper: {camper.name}
      </h2>
      <CamperForm
        initialData={camper}
        action={updateCamperWithId}
        submitText="Desar Canvis"
      />
    </div>
  );
}
