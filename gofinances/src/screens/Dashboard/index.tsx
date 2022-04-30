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
          <HighLightCard />
          <HighLightCard />
          <HighLightCard />
        </HighLightCards>
      </Container>
    </>
  );
}
