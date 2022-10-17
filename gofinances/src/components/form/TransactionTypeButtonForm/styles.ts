import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  isActive: boolean;
  type: "income" | "outcome";
}

interface IconProps {
  type: "income" | "outcome";
}

export const TransactionTypeButtonFormContainer = styled(TouchableOpacity)<Props>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 16px;


  ${({isActive, type}) => isActive && type === 'income' && css`
    background: ${({theme}) => theme.colors.success_light};
  `}
  
  ${({isActive, type}) => isActive && type === 'outcome' && css`
    background: ${({theme}) => theme.colors.attention_light};
  `}
  
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ type, theme }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
