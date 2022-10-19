import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths } from "date-fns";
import ptBR from "date-fns/locale/pt-BR/index.js";
import { useCallback, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";
import { categories } from "../../utils/categories";
import {
  ChartContainer,
  Header, Mont, MonthSelect,
  MonthSelectButton,
  MonthSelectIcon, ResumeContainer,
  ScrollViewContent,
  Title
} from "./styles";


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
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const theme = useTheme()

  const dateFormatted = format(selectedDate, 'MMMM', {
    locale: ptBR,
  })

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setIsLoading(true)

    const collectionKey = '@gofinance:transaction'
    const response = await AsyncStorage.getItem(collectionKey)
    const formattedResponse = response ? JSON.parse(response) : []

    const expensive = formattedResponse
      .filter((expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      )

    const expensiveTotal = expensive.reduce((acc: number, expensive: TransactionData) => {
      return acc + Number(expensive.amount)
    }, 0)


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
    setIsLoading(false)
  }


  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <ResumeContainer>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
        isLoading ? (
          <Loading />
        ) : (
          <ScrollViewContent
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight()
            }}
          >

            <MonthSelect>
              <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                <MonthSelectIcon name='chevron-left' />
              </MonthSelectButton>

              <Mont>{dateFormatted}</Mont>

              <MonthSelectButton onPress={() => handleChangeDate('next')}>
                <MonthSelectIcon name='chevron-right' />
              </MonthSelectButton>
            </MonthSelect>


            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={50}
                x='percent'
                y='total'
              />
            </ChartContainer>

            {
              totalByCategories.map(
                item => (
                  <HistoryCard
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                  />
                )
              )
            }
          </ScrollViewContent>
        )
      }
    </ResumeContainer>
  )
}

