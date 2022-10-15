import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import {
  Footer, FooterWrapper, Header,
  SignInContainer,
  SignInTitle,
  Title,
  TitleWrapper
} from "./styles";


export function SignIn() {
  return (
    <SignInContainer>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>

      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
          />

          <SignInSocialButton
            title="Entrar com o Apple"
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>

    </SignInContainer>
  )
}