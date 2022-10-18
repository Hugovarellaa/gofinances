import { useState } from "react";
import { Modal } from "react-native";
import { ButtonForm } from "../../components/form/ButtonForm";
import { CategorySelectButtonForm } from "../../components/form/CategorySelectButtonForm";
import { InputForm } from "../../components/form/Input";
import { TransactionTypeButtonForm } from "../../components/form/TransactionTypeButtonForm";
import { CategorySelect } from "../CategorySelect";
import { Fields, Form, Header, RegisterContainer, Title, TransactionTypes } from "./style";

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)

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
          <CategorySelectButtonForm title={category.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <ButtonForm title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </RegisterContainer>
  )
}