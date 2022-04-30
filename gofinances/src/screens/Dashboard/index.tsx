import React from "react";
import { HighLightCard } from "../../components/HighLightCard";
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
} from "./styles";

export function Dashboard() {
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
      </Container>
    </>
  );
}
