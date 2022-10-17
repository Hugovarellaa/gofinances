import { HighlightCard } from "../../components/HighlightCard";
import {
  AvatarUser, DashboardContainer,
  Header, HighlightCards, Icon, User, UserGreeting, UserInfo, UserName, UserWrapper
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

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />

      </HighlightCards>
    </DashboardContainer>
  )
}