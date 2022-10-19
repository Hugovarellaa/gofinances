import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { ChartContainer, Content, Header, ResumeContainer, Title } from "./styles";


export interface TransactionData {
  type: "positive" | "negative"
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string
  percent: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  async function loadData() {
    const collectionKey = '@gofinance:transaction'
    const response = await AsyncStorage.getItem(collectionKey)
    const formattedResponse = response ? JSON.parse(response) : []

    const expensive = formattedResponse
      .filter((expensive: TransactionData) => expensive.type === 'negative')

    const expensiveTotal = expensive.reduce((acc: number, expensive: TransactionData) => {
      return acc + Number(expensive.amount)
    }, 0)

    console.log(expensiveTotal)

    const totalByCategory: CategoryData[] = []


    categories.forEach(category => {
      let categorySum = 0

      expensive.forEach((element: TransactionData) => {
        if (element.category === category.key) {
          categorySum += Number(element.amount)
        }
      })
      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        })

        const percent = `${(categorySum / expensiveTotal * 100).toFixed(1)}%`

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted: total,
          color: category.color,
          key: category.key,
          percent
        })

      }
    })
    setTotalByCategories(totalByCategory)
  }


  useEffect(() => {
    loadData()
  }, [])

  return (
    <ResumeContainer>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content >
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x='percent'
            y='total'
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
          />

        </ChartContainer>
        {
          totalByCategories.map(item => (
            <HistoryCard
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
              key={item.key}
            />
          ))
        }
      </Content>

    </ResumeContainer>
  )
}

