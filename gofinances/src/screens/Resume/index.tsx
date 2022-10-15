import { HistoryCard } from "../../components/HistoryCard";
import { Header, ResumeContainer, Title } from "./styles";

export function Resume (){
  return (
    <ResumeContainer>
       <Header>
          <Title>Resumo por categoria</Title>
        </Header>

        <HistoryCard title="Compras" amount="R$ 150,50" color="red"/>

    </ResumeContainer>
  )
}