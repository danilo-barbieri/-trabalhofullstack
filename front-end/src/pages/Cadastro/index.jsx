import React, { useState } from 'react';
import { Container, ContainerForm, Form, Label, Links, Mask } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/Api';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';


const Cadastro = () => {
  const [recaptcha, setRecaptcha] = useState(null);
  const [data, setData] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
  });

  const InputValue = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/createusers', data)

      .then((response) => {
        if (data.name === '' || data.cpf === '' || data.phone === '' || data.email === '' || data.password === '') {
          toast('Preencha todos os campos!');
        } else if (!response.data.error === true) {
          toast(response.data.message);
        } else {
          toast(response.data.message);
        }
      })
      .catch((response) => {
        if (response.status === 409) {
          toast(response.response.data.message);
        }
      })
  };

  return (
    <Container>
      <h2>Crie sua conta</h2>
      <p>Cadastre-se agora!</p>
      <ContainerForm>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Label for="username">Usuário</Label>
          <Input type="text" name="name" id="name" placeholder="Usuário" onChange={InputValue} autocomplete="off" required />
          <Label for="CPF">CPF</Label>
          <Mask mask="999.999.999-99" name="cpf" id="cpf" placeholder="Digite seu CPF" onChange={InputValue} autocomplete="off" required />
          <Label for="birthdate">Phone</Label>
          <Mask mask="(99) 99999-9999" name="phone" id="phone" placeholder="Digite seu Telefone" onChange={InputValue} autocomplete="off" required />
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" placeholder="Digite seu Email" onChange={InputValue} autocomplete="off" required />
          <Label for="password">Senha</Label>
          <Input type="password" name="password" id="password" placeholder="Digite sua Senha" onChange={InputValue} autocomplete="off" required />
          <ReCAPTCHA
            sitekey="6LcpxSwqAAAAAE2yAjZ5KlYY515HBcTQnfuETeQm"
            onChange={(value) => setRecaptcha(value)}
            size="normal"
            theme="clear"
            />
          <Links>
            Já possui conta? <a href="/login">Faça Login</a>
          </Links>
          <Button disable={!recaptcha} type="submit">Entrar</Button>
        </Form>
      </ContainerForm>
    </Container>
  )
}

export default Cadastro;