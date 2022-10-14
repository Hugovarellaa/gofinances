import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Fields, Form, Header, RegisterContainer, Title, TransactionTypes } from "./styles";

interface FormData {
  name: string;
  amount: string;
}


export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)

  const { control, handleSubmit } = useForm()

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

  function handleInputForm({ name, amount }: FormData) {
    const data = {
      name,
      amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <RegisterContainer>
      <Header>
        <Title>Cadastro</Title>
      </Header>


      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />

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
          <CategorySelectButton title={category.name} onPress={handleOpenCategoryModal} />
        </Fields>
        <Button title="Enviar" onPress={handleSubmit(handleInputForm)} />
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