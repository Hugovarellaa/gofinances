import { Amount, Header, HighlightCardContainer, Icon, LastTransaction, Title } from "./styles";

interface Props {
  title: string;
  amount: string
  lastTransaction: string
  type: 'up' | 'down' | 'total'
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
}

export function HighlightCard({type, amount, title, lastTransaction }: Props) {
  return (
    <HighlightCardContainer>
      <Header>
        <Title>{title}</Title>
        <Icon name={icon[type]} />
      </Header>
      <Amount>{amount}</Amount>
      <LastTransaction>{lastTransaction}</LastTransaction>
    </HighlightCardContainer>
  )
}