import { useState } from "react";
import { ButtonForm } from "../../components/form/ButtonForm";
import { CategorySelectButtonForm } from "../../components/form/CategorySelectButtonForm";
import { InputForm } from "../../components/form/Input";
import { TransactionTypeButtonForm } from "../../components/form/TransactionTypeButtonForm";
import { Fields, Form, Header, RegisterContainer, Title, TransactionTypes } from "./style";

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  return (
    <RegisterContainer>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm placeholder="Nome" />
          <InputForm placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButtonForm
              title="Income"
              type="income"
              isActive={transactionType === 'income'}
              onPress={() => handleTransactionTypeSelect('income')}
            />
            <TransactionTypeButtonForm
              title="Outcome"
              type="outcome"
              isActive={transactionType === 'outcome'}
              onPress={() => handleTransactionTypeSelect('outcome')}
            />
          </TransactionTypes>
        <CategorySelectButtonForm title="Categoria"/>
        </Fields>
        <ButtonForm title="Enviar" />
      </Form>
    </RegisterContainer>
  )
}