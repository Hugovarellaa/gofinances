import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ButtonFormContainer = styled(TouchableOpacity)`
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  align-items: center;
  padding: 18px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
