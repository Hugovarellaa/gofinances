import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const CategorySelectContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7
})`
  background: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  padding:18px 16px;
  margin-top: 16px;
`

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

`
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};

`