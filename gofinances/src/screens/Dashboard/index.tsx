import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import { useTheme } from "styled-components";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  DashboardContainer,
  Header, HighLightCards, Icon, LoadingContainer, LogoutButton, Photo,
  Title, TransactionList, Transactions,
  User, UserContainer, UserGreeting, UserInfo, UserName
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighLightProps {
  amount: string
  lastTransaction: string
}

interface HighLightData {
  entries: HighLightProps
  expensive: HighLightProps
  total: HighLightProps
}


export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData)

  const theme = useTheme()


  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const lastTransaction =
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime()))

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: '2-digit',
    }).format(new Date(lastTransaction))


  }


  async function LoadTransaction() {
    const collectionKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(collectionKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesSumTotal = 0
    let expensiveTotal = 0

    const transactionFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        if (item.type === 'positive') {
          entriesSumTotal += Number(item.amount)
        }

        if (item.type === 'negative') {
          expensiveTotal += Number(item.amount)
        }


        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
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
    setTransactions(transactionFormatted)

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 à ${lastTransactionEntries}`

    const total = entriesSumTotal - expensiveTotal
    setHighLightData({
      entries: {
        amount: entriesSumTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: `Última entrada dia  ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: `Última Saída dia  ${lastTransactionExpensive}`

      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        }),
        lastTransaction: totalInterval
      },
    })
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    LoadTransaction()
  }, []))


  useEffect(() => {
    LoadTransaction()


  }, [])

  return (
    <DashboardContainer>

      {isLoading ?
        <LoadingContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size='large'
          />
        </LoadingContainer> :
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <Photo
                  source={{ uri: 'https://github.com/Hugovarellaa.png' }}
                />
                <User>
                  <UserGreeting>Olá</UserGreeting>
                  <UserName>Hugo</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => { }}>
                <Icon name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>

          <HighLightCards >
            <HighLightCard
              type="up"
              title="Entradas"
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
            />
            <HighLightCard
              type="down"
              title="Saida"
              amount={highLightData.expensive.amount}

              lastTransaction={highLightData.expensive.lastTransaction}
            />
            <HighLightCard
              type="total"
              title="Total"
              amount={highLightData.total.amount}

              lastTransaction={highLightData.total.lastTransaction}
            />
          </HighLightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              keyExtractor={item => item.id}
              data={transactions}
              renderItem={({ item }) => <TransactionCard data={item} />}
            >
            </TransactionList>

          </Transactions>



        </>
      }

    </DashboardContainer>
  )
}

