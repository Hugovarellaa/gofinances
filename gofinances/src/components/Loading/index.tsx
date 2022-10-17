import { useTheme } from "styled-components";
import { ActivityIndicatorContainer, LoadingContainer } from "./styles";


export function Loading() {
  const {colors} = useTheme()
  return (
    <LoadingContainer>
      <ActivityIndicatorContainer/>
    </LoadingContainer>
  );
}