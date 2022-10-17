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
    <HighlightCardContainer type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type}/>
      </Header>
      <Amount type={type}>{amount}</Amount>
      <LastTransaction type={type}>{lastTransaction}</LastTransaction>
    </HighlightCardContainer>
  )
}