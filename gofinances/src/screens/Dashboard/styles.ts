import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { DataListProps } from ".";
import { FlatList, FlatListProps } from "react-native";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  height: ${RFPercentage(36)}px;

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const HeaderWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInf = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.secondary};
` as unknown as typeof Feather;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-bottom: -10px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;

export const HighLightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(17)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: 4px;
  margin-bottom: 7px;
`;

export const TransactionList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 20,
  },
})``;
