import { Category, CategorySelectButtonContainer, Icon } from "./styles";

interface Props {
  title: string
  onPress: () => void
}

export function CategorySelectButton ({title , onPress}:Props){
  return (
    <CategorySelectButtonContainer onPress={onPress}>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down"/>  
    </CategorySelectButtonContainer>
  )
}