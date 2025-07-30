import { Container } from "@/components/layout/Container";
import { Content } from "@/components/layout/Content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Atendimento() {
  return (
    <Container>
      <Header>Texte de Header fixo</Header>
      <Content />
      <Footer>Test de Footer fixo</Footer>
    </Container>
  );
}
