import { ComandaProvider } from "../context/ComandaContext";
import Atendimento from "./Atendimento";

export default function PaginaAtendimento() {
  return (
    <ComandaProvider>
      <main>
        <h1>Página de atendimento</h1>
        <Atendimento />
      </main>
    </ComandaProvider>
  );
}
