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
        <Card />
        <Card />
        <Card />
      </Cards>
    </Container>
  );
}
