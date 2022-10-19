import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ActivityIndicatorContainer = styled(ActivityIndicator)`
  color: ${({ theme }) => theme.colors.primary};
`;
