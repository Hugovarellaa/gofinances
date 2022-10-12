import { HighLightCard } from "../../components/HighLightCard";
import {
  DashboardContainer,
  Header, HighLightCards, Icon, Photo,
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

      <HighLightCards >
        <HighLightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighLightCard
          type="down"
          title="Saida"
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

    </DashboardContainer>
  )
}

