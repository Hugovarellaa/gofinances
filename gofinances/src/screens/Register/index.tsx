import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as yup from "yup";
import { ButtonForm } from "../../components/form/ButtonForm";
import { CategorySelectButtonForm } from "../../components/form/CategorySelectButtonForm";
import { InputForm } from "../../components/form/InputForm";
import { TransactionTypeButtonForm } from "../../components/form/TransactionTypeButtonForm";
import { CategorySelect } from "../CategorySelect";
import { Fields, Form, Header, RegisterContainer, Title, TransactionTypes } from "./style";

interface FormData {
  name: string;
  amount: string
}

const createFromValidateSchema = yup.object().shape({
  name: yup.string().required('Nome é Obrigatório'),
  amount: yup.number().typeError('Informe um valor numérico').positive('O valor nao pode ser negativo').required('O valor e Obrigatório')
})

type Form = yup.InferType<typeof createFromValidateSchema>

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const createForm = useForm({
    resolver: yupResolver(createFromValidateSchema)
  })
  const { control, handleSubmit, formState } = createForm
  const { errors } = formState

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)

  }

  function handleRegister(form: Form) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da Transação')
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <RegisterContainer>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name='name'
              control={control}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message as string}
            />
            <InputForm
              placeholder="Preço"
              name='amount'
              control={control}
              keyboardType='numeric'
              error={errors.amount && errors.amount.message as string}
            />

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
            <CategorySelectButtonForm title={category.name} onPress={handleOpenSelectCategoryModal} />
          </Fields>
          <ButtonForm title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </RegisterContainer>
    </TouchableWithoutFeedback>
  )
}