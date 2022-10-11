import styled from "styled-components/native"

export const DashboardContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background: ${({theme}) => theme.colors.background}
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title};
`