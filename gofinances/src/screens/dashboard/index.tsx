import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { Loading } from "../../components/Loading";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  AvatarUser,
  DashboardContainer,
  Header, HighlightCards, Icon, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper
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
  const [isLoading, setIsLoading] = useState(true)
  const [transaction, setTransaction] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState({} as HighLightData)

  let entriesTotal = 0
  let expensiveTotal = 0

  function GetLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    return new Date(
      Math.max.apply(Math,
        collection
          .filter((transaction) =>
            transaction.type === type).map((transaction) =>
              new Date(transaction.date).getTime()))).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
              })
  }


  async function loadTransaction() {
    const collectionKey = '@gofinance:transaction'
    const response = await AsyncStorage.getItem(collectionKey)
    const transaction = response ? JSON.parse(response) : [];


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

    const total = entriesTotal - expensiveTotal


    const lasTransactionEntries = GetLastTransactionDate(transaction, 'positive')
    const lastTransactionExpensive = GetLastTransactionDate(transaction, 'negative')
    const totalInterval = `01 à ${lastTransactionExpensive}`

    setTransaction(transactionFormatted)

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: `Ultima entrada dia ${lasTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: `Ultima saída dia ${lastTransactionExpensive}`
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

  useFocusEffect(useCallback(() => {
    loadTransaction()
  }, []))

  return isLoading ? (
    <Loading />
  ) : (
    <DashboardContainer>
      <Header>
        <UserWrapper>
          <User>
            <AvatarUser source={{
              uri: 'https://github.com/Hugovarellaa.png'
            }}
            />
            < UserInfo >
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Hugo Varella</UserName>
            </UserInfo >
          </User >
          <Icon name='power' />
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