import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface TypeProps {
  type: "up" | "down" | "total";
}

export const HighlightCardContainer = styled.View<TypeProps>`
  background-color: ${({ type, theme }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  padding: 19px 23px ${RFValue(42)}px;
  margin-right: 16px;
  border-radius: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ type, theme }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type, theme }) =>
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type, theme }) =>
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ type, theme }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 35px;

  color: ${({ type, theme }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ type, theme }) =>
    type === "total" ? theme.colors.shape : theme.colors.text};
`;
