import { Category, CategorySelectButtonContainer, Icon } from "./styles";

interface Props {
  title: string
}

export function CategorySelectButton ({title}:Props){
  return (
    <CategorySelectButtonContainer>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down"/>  
    </CategorySelectButtonContainer>
  )
}