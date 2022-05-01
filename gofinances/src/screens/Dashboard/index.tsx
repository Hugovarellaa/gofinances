import React from "react";
import { HighLightCard } from "../../components/HighLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInf,
  Photo,
  User,
  UserGreeting,
  UserName,
  HeaderWrapper,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "05/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "home",
      },
      date: "17/04/2020",
    },
    {
      id: "4",
      type: "positive",
      title: "Freelancer",
      amount: "R$ 2.000,00",
      category: {
        name: "Dev",
        icon: "shopping-bag",
      },
      date: "20/04/2020",
    },
  ];

  return (
    <>
      <Container>
        <Header>
          <HeaderWrapper>
            <UserInf>
              <Photo
                source={{
                  uri: "https://github.com/Hugovarellaa.png",
                }}
              />
              <User>
                <UserGreeting>Olá</UserGreeting>
                <UserName>Hugo</UserName>
              </User>
            </UserInf>
            <Icon name="power" />
          </HeaderWrapper>
        </Header>

        <HighLightCards>
          <HighLightCard
            type="up"
            title="Entradas"
            amount="R$ 17.400,00"
            lastTransaction="Última entrada dia 13 de abril"
          />
          <HighLightCard
            type="down"
            title="Saídas"
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
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        </Transactions>
      </Container>
    </>
  );
}
