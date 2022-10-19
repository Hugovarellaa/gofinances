import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
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

type NavigationProps = {
  navigate: (screen: string) => void;
}

const createFromValidateSchema = yup.object().shape({
  name: yup.string().required('Nome é Obrigatório'),
  amount: yup.number().typeError('Informe um valor numérico').positive('O valor nao pode ser negativo').required('O valor e Obrigatório')
})

type Form = yup.InferType<typeof createFromValidateSchema>

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const navigation = useNavigation<NavigationProps>()

  const createForm = useForm({
    resolver: yupResolver(createFromValidateSchema)
  })
  const { control, handleSubmit, formState, reset } = createForm
  const { errors } = formState

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)

  }

  async function handleRegister(form: Form) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da Transação')
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const collectionKey = '@gofinance:transaction'

      const data = await AsyncStorage.getItem(collectionKey)

      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      reset()


      navigation.navigate('Listagem');

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted))

    } catch (error) {
      console.log(error)
      Alert.alert('Nao foi possível salvar')
    }
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
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionTypeSelect('positive')}
              />
              <TransactionTypeButtonForm
                title="Outcome"
                type="outcome"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionTypeSelect('negative')}
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