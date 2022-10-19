import { Footer, Header, SignInContainer, SignInTitle, Title, TitleWrapper } from "./styles";

import { RFValue } from "react-native-responsive-fontsize";
import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";

export function SignIn() {
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
        <AppleSVG
          width={RFValue(24)}
          height={RFValue(24)} />
        <GoogleSVG
          width={RFValue(24)}
          height={RFValue(24)} />
      </Footer>

    </SignInContainer>
  )
}