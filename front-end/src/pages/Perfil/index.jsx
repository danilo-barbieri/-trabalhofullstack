import React, { useState, useEffect } from 'react';
import { Container, ContainerForm, Form, Label, Links } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/Api';
import { toast } from 'react-toastify';

const Perfil = () => {
  const [data, setData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    userId: '',  // Ensure this is properly initialized
  });

  useEffect(() => {
    // Fetch user profile data on component mount
    api.get('/userprofile')
      .then((response) => {
        setData({ ...response.data, userId: response.data.id }); // Make sure 'id' is available in response
      })
      .catch((error) => {
        toast.error('Erro ao carregar perfil'); // Changed to toast.error for better clarity
      });
  }, []);

  const InputValue = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.userId) {
      // Update user profile
      api.put(`/users/${data.userId}`, data)
        .then((response) => {
          toast.success(response.data.message); // Changed to toast.success for success message
        })
        .catch((error) => {
          toast.error('Erro ao atualizar perfil'); // Changed to toast.error for better clarity
        });
    } else {
      toast.error('Erro: ID do usuário não encontrado'); // Changed to toast.error for consistency
    }
  };

  return (
    <Container>
      <h2>Perfil do Usuário</h2>
      <p>Atualize seus dados</p>
      <ContainerForm>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Label htmlFor="name">Usuário</Label>
          <Input type="text" name="name" id="name" placeholder="Usuário" value={data.name} onChange={InputValue} required />
          <Label htmlFor="cpf">CPF</Label>
          <Input type="text" name="cpf" id="cpf" placeholder="Digite seu CPF" value={data.cpf} onChange={InputValue} disabled />
          <Label htmlFor="phone">Telefone</Label>
          <Input type="text" name="phone" id="phone" placeholder="Digite seu Telefone" value={data.phone} onChange={InputValue} required />
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" id="email" placeholder="Digite seu Email" value={data.email} onChange={InputValue} required />
          <Button type="submit">Atualizar</Button>
        </Form>
      </ContainerForm>
      <Links>
        <a href="/changepassword">Alterar Senha</a>
      </Links>
    </Container>
  )
}

export default Perfil;
