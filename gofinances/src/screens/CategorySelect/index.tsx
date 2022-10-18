import { FlatList } from "react-native";
import { ButtonForm } from "../../components/form/ButtonForm";
import { categories } from "../../utils/categories";
import { Category, CategorySelectContainer, Footer, Header, Icon, Name, Separator, Title } from "./styes";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {
  return (
    <CategorySelectContainer>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )
        }
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <ButtonForm title="Selecionar" />
      </Footer>
    </CategorySelectContainer>
  )
}