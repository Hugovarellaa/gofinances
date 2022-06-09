import React from "react";
import { Card } from "../../components/Card";
import {
  Avatar,
  Cards,
  Container,
  Header,
  Icon,
  User,
  UserContainer,
  UserGreeting,
  UserInfo,
  UserName
} from "./styles";

export function Dashboard() {
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
    </Container>
  );
}
