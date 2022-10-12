import {
  Amount,
  Category, CategoryName,
  Date, Footer, Icon, Title, TransactionCardContainer
} from "./styles";

type Category = {
  name: string
  icon: string
}

interface Data {
  title: string;
  amount: string;
  category: Category
  date: string
}

interface TransactionCardProps {
  data: Data
}

export function TransactionCard({ data }: TransactionCardProps) {
  return (
    <TransactionCardContainer>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>

      <Footer>
        <Category>
          <Icon name='dollar-sign' />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </TransactionCardContainer>
  )
}