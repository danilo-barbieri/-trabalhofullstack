import React from 'react';
import { Container, Button } from './styles'; // Certifique-se de definir esses estilos

const Home = () => {
  return (
    <Container>
      <h1>Bem-vindo à Plataforma</h1>
      <p>Por favor, faça login ou registre-se para continuar.</p>
      <div>
        <Button href="/login">Login</Button>
        <Button href="/cadastro">Registrar</Button>
      </div>
    </Container>
  );
}

export default Home;
