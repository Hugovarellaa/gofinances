import {
  AvatarUser, DashboardContainer,
  Header, Icon, User, UserGreeting, UserInfo, UserName, UserWrapper
} from "./styles";

export function Dashboard() {
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
    </DashboardContainer>
  )
}