import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR/index.js';
import { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import {
  ChartContainer,
  Header, Month, MonthSelect,
  MonthSelectButton,
  MonthSelectIcon, ResumeContainer,
  ScrollViewContent,
  Title
} from "./styles";

export interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string
  date: string
}

interface CategoryData {
  key: string
  name: string;
  total: number
  totalFormatted: string
  color: string;
  percent: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const theme = useTheme()

  function handleChangeDate(action: 'next' | 'previous') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, +1)
      setSelectedDate(newDate)
      console.log(newDate)

    } else {
      const newDate = addMonths(selectedDate, -1)
      setSelectedDate(newDate)
      console.log(newDate)
    }
  }


  async function loadData() {
    const collectionKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(collectionKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter((expensive: TransactionData) => 
        expensive.type === 'negative' && 
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear())

        console.log(expensives)

    const totalByCategory: CategoryData[] = []

    const expensivesTotal = expensives.reduce((acc: number, expensive: TransactionData) => {
      return acc + Number(expensive.amount)
    }, 0)



    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })
      if (categorySum > 0) {

        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL"
        })

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: total,
          percent
        })
      }
    })
    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [selectedDate])

  return (
    <ResumeContainer>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <ScrollViewContent
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight()
        }}
      >

        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeDate('previous')}>
            <MonthSelectIcon name='chevron-left' />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'LLLL, yyyy', {
            locale: ptBR
          })}</Month>

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



    </ResumeContainer >
  )
}