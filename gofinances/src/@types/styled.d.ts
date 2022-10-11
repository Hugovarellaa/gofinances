import 'styled-components'
import theme from '../styles/theme/default'

declare module 'styled-components' {
  type ThemeType = typeof theme 
  export interface DefaultTheme extends ThemeType {}
}