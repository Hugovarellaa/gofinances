import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import * as yup from 'yup';
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

type NavigationProps = {
  navigate: (screen: string) => void;
}

const transactionFormDataSchemaValidator = yup.object().shape({
  name: yup.string().required('O Nome e Obrigatório'),
  amount: yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo'),
})

// type TransactionSchema = yup.InferType<typeof transactionFormDataSchemaValidator>

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)

  const collectionKey = '@gofinances:transactions'

  const navigation = useNavigation<NavigationProps>()
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(transactionFormDataSchemaValidator),
  })

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

  async function handleInputForm({ name, amount }: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione a Categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name,
      amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(collectionKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted))
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categorias',
      })
      reset()
      navigation.navigate('Listagem')

    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar')
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
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message as string}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message as string}

            />

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
    </TouchableWithoutFeedback>
  )
}