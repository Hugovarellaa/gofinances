import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  AvatarUser, DashboardContainer,
  Header, HighlightCards, Icon, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: 'dollar-sign'
      },
      date: "17/10/2022"
    },
    {
      id: '2',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 2.000,00",
      category: {
        name: "Casa",
        icon: 'home'
      },
      date: "17/10/2022"
    },
    {
      id: '3',
      type: 'negative',
      title: "Super mercado",
      amount: "R$ 3.000,00",
      category: {
        name: "Compras",
        icon: 'shopping-bag'
      },
      date: "17/10/2022"
    },
  ]

  return (
    <DashboardContainer>
      <Header>
        <UserWrapper>
          <User>
            <AvatarUser source={{
              uri: 'https://github.com/Hugovarellaa.png'
            }}
            />
            <UserInfo>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Hugo Varella</UserName>
            </UserInfo>
          </User>
          <Icon name='power' />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />

      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </DashboardContainer>
  )
}