import { Amount, HistoryCardContainer, Title } from "./styles";

interface Props {
  title: string
  amount: string
  color: string
}

export function HistoryCard ({title,amount,color}:Props){
  return (
    <HistoryCardContainer color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </HistoryCardContainer>
  )
}