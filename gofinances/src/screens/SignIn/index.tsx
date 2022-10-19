import { Footer, FooterWrapper, Header, SignInContainer, SignInTitle, Title, TitleWrapper } from "./styles";

import { useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";
import { Loading } from "../../components/Loading";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Google')
      setIsLoading(false)
      console.log(error)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Apple')
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <SignInContainer>

      {
        isLoading ? (
          <Loading />
        ) : (
          <>
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
                <SignInSocialButton title='Entrar com o Apple' svg={AppleSVG} onPress={handleSignInWithApple} />
              </FooterWrapper>
            </Footer>
          </>
        )
      }

    </SignInContainer>
  )
}