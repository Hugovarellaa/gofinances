import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { Fields, Form, Header, RegisterContainer, Title } from "./styles";

export function Register() {
  return (
    <RegisterContainer>
      <Header>
        <Title>Cadastro</Title>
      </Header>


      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

        </Fields>
        <Button title="Enviar" />
      </Form>

    </RegisterContainer>
  )
}