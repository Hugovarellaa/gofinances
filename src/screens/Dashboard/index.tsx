import React from "react";
import { Card } from "../../components/Card";
import {
  TransactionCard,
  TransactionCardProps
} from "../../components/TransactionCard";

import {
  Avatar,
  Cards,
  Container,
  Header,
  Icon,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserContainer,
  UserGreeting,
  UserInfo,
  UserName
} from "./styles";

export interface IDataListProps extends TransactionCardProps {
  id: number;
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: 1,
      type: "positive",
      title: "Desenvolvimento de aplicações",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "12/04/2022",
    },
    {
      id: 2,
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "12/04/2022",
    },
    {
      id: 3,
      type: "negative",
      title: "Academia",
      amount: "R$ 200,00",
      category: {
        name: "Saude",
        icon: "shopping-bag",
      },
      date: "12/04/2022",
    },
    {
      id: 4,
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "home",
      },
      date: "12/04/2022",
    },
  ];

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Avatar source={{ uri: "https://github.com/Hugovarellaa.png" }} />

            <User>
              <UserGreeting>Ola,</UserGreeting>
              <UserName>Hugo Varella</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserContainer>
      </Header>

      <Cards>
        <Card
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <Card
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <Card
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </Cards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
