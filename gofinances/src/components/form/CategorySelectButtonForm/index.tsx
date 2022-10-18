import { Category, CategorySelectButtonFormContainer, Icon } from "./styles";

interface Props {
  title: string
}

export function CategorySelectButtonForm ({title}:Props){
  return (
    <CategorySelectButtonFormContainer>
      <Category>{title}</Category>
      <Icon name='chevron-down'/>
    </CategorySelectButtonFormContainer>
  )
}