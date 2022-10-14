import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  DashboardContainer,
  Header, HighLightCards, Icon, LogoutButton, Photo,
  Title, TransactionList, Transactions,
  User, UserContainer, UserGreeting, UserInfo, UserName
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}


export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function LoadTransaction() {
    const collectionKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(collectionKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
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
      setData(transactionFormatted)
  }

  useEffect(() => {
    LoadTransaction()
  }, [])

  return (
    <DashboardContainer>
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighLightCard
          type="down"
          title="Saida"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighLightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
        >
        </TransactionList>

      </Transactions>

    </DashboardContainer>
  )
}

