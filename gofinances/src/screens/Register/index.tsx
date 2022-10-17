import { ButtonForm } from "../../components/form/ButtonForm";
import { InputForm } from "../../components/form/Input";
import { Fields, Form, Header, RegisterContainer, Title } from "./style";

export function Register() {
  return (
    <RegisterContainer>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm placeholder="Nome" />
          <InputForm placeholder="Preço" />
        </Fields>
        <ButtonForm title="Enviar" />
      </Form>
    </RegisterContainer>
  )
}