import Hero from "@/components/Hero";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container sx={{
      height: '100vh',
      maxWidth: '1200px'
    }}>
      <Hero />
    </Container>
  );
}
