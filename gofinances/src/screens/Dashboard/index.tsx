import { FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard } from "../../components/TransactionCard";
import {
  DashboardContainer,
  Header, HighLightCards, Icon, Photo,
  Title, Transactions,
  User, UserContainer, UserGreeting, UserInfo, UserName
} from "./styles";


export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: 'dollar-sign'
      },
      date: "13/04/2020"
    },
    {
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: 'coffee'
      },
      date: "13/04/2020"
    },
    {
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.000,00",
      category: {
        name: "Casa",
        icon: 'home'
      },
      date: "13/04/2020"
    }

  ]

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
          <Icon name="power" />
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

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingBottom: getBottomSpace() 
          }}
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
        >
        </FlatList>

      </Transactions>

    </DashboardContainer>
  )
}

