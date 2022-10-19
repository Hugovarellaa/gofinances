import { Footer, FooterWrapper, Header, SignInContainer, SignInTitle, Title, TitleWrapper } from "./styles";

import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Google')
      console.log(error)
    }
  }

  return (
    <SignInContainer>
      <Header>
        <TitleWrapper>
          <LogoSVG
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title='Entrar com o Google' svg={GoogleSVG} onPress={handleSignInWithGoogle} />
          <SignInSocialButton title='Entrar com o Apple' svg={AppleSVG} />
        </FooterWrapper>

      </Footer>

    </SignInContainer>
  )
}