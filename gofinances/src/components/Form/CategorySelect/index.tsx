import { Category, CategorySelectContainer, Icon } from "./styles";

interface Props {
  title: string
}

export function CategorySelect ({title}:Props){
  return (
    <CategorySelectContainer>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down"/>  
    </CategorySelectContainer>
  )
}