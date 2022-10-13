import { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Fields, Form, Header, RegisterContainer, Title, TransactionTypes } from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenCategoryModal() {
    setIsModalCategoryOpen(true)
  }

  function handleCloseCategoryModal() {
    setIsModalCategoryOpen(false)
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
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />

          </TransactionTypes>
          <CategorySelectButton title="Categoria" onPress={handleOpenCategoryModal} />
        </Fields>
        <Button title="Enviar" />
      </Form>

      <Modal visible={isModalCategoryOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategoryModal}

        />
      </Modal>

    </RegisterContainer>
  )
}