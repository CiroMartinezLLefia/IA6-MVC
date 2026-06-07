import CamperForm from "@/components/CamperForm";
import { createCamperModel } from "@/actions/camper";

export default function NewCamperPage() {
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
        Afegir Nova Camper a la Flota
      </h2>
      <CamperForm action={createCamperModel} submitText="Crear Model" />
    </div>
  );
}
