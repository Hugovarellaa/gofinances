import React from "react";
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
      </Container>
    </>
  );
}
