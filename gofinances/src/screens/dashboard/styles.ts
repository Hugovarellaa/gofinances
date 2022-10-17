import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const DashboardContainer = styled.View`
  flex:1;
  background: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
  width:100%;
  background: ${({theme}) => theme.colors.primary};
  height: ${RFPercentage(36)}px;
`