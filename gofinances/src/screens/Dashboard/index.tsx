import {
  DashboardContainer,
  Header, Icon, Photo,
  User, UserContainer, UserGreeting, UserInfo, UserName
} from "./styles";


export function Dashboard() {
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
    </DashboardContainer>
  )
}

