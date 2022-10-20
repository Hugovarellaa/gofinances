import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { Loading } from "../../components/Loading";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { useAuth } from "../../hooks/auth";
import {
  AvatarUser,
  DashboardContainer,
  Header, HighlightCards, Icon, LogoutButton, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightDataProps {
  amount: string
  lastTransaction: string
}

interface HighLightData {
  entries: HighlightDataProps
  expensive: HighlightDataProps
  total: HighlightDataProps
}

export function Dashboard() {
  const { SignOut, user } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [transaction, setTransaction] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState({} as HighLightData)




  function GetLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const collectionFlittered = collection.filter(transaction => transaction.type === type)

    if (collectionFlittered.length === 0) {
      return 0
    }

    return new Date(
      Math.max.apply(Math,
        collectionFlittered.map((transaction) =>
          new Date(transaction.date).getTime()))).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
          })
  }


  async function loadTransaction() {
    const collectionKey = `@gofinance:transaction_user:${user.name}`
    const response = await AsyncStorage.getItem(collectionKey)
    const transaction = response ? JSON.parse(response) : [];

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionFormatted: DataListProps[] = transaction.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }



      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: "BRL"
      });
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    })
    setTransaction(transactionFormatted)



    const lasTransactionEntries = GetLastTransactionDate(transaction, 'positive')
    const lastTransactionExpensive = GetLastTransactionDate(transaction, 'negative')
    const totalInterval = lastTransactionExpensive === 0 ? 'Nao há transações' : `01 à ${lastTransactionExpensive}`

    const total = entriesTotal - expensiveTotal

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: lasTransactionEntries === 0 ? 'Nao há transações' : `Ultima entrada dia ${lasTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: lastTransactionExpensive === 0 ? 'Nao há transações' : `Ultima saída dia ${lastTransactionExpensive}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)

  }

  async function removeStorage() {
    const collectionKey = `@gofinance:transaction_user:${user.name}`
    await AsyncStorage.removeItem(collectionKey)
  }

  useFocusEffect(useCallback(() => {
    loadTransaction()
    // removeStorage()


  }, []))

  return isLoading ? (
    <Loading />
  ) : (
    <DashboardContainer>
      <Header>
        <UserWrapper>
          <User>
            <AvatarUser source={{
              uri: user.photo
            }}
            />
            < UserInfo >
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </UserInfo >
          </User >
          <LogoutButton onPress={SignOut}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper >
      </Header >

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction={highlightData.entries.lastTransaction}
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount={highlightData.expensive.amount}
          lastTransaction={highlightData.expensive.lastTransaction}
          type="down"
        />

        <HighlightCard
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
          type="total"
        />

      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transaction}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </DashboardContainer >
  )
}