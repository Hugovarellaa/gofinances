import { Amount, HistoryCardContainer, Title } from "./styles";

interface HistoryProps {
  title: string;
  amount: string
  color: string
}

export function HistoryCard ({title, amount, color}:HistoryProps){
  return (
    <HistoryCardContainer color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </HistoryCardContainer>
  )
}