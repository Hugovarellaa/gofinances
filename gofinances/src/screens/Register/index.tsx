import { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Fields, Form, Header, RegisterContainer, Title, TransactionTypes } from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return (
    <RegisterContainer>
      <Header>
        <Title>Cadastro</Title>
      </Header>


      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes >
            <TransactionTypeButton
              title="Income"
              type="up"
              isActive={transactionType  === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />

          </TransactionTypes>
        <CategorySelect  title="Categoria"/>
        </Fields>
        <Button title="Enviar" />
      </Form>

    </RegisterContainer>
  )
}