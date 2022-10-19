import { NavigationContainer } from "@react-navigation/native"
import { useAuth } from "../hooks/auth"
import { AppRoutes } from "./app.routes"
import { AuthRouter } from "./auth.routes"



export function Routes() {
  const { user } = useAuth()
  console.log(user)

  return (
    <NavigationContainer>
      {
        user.id ? <AppRoutes /> : <AuthRouter />
      }
    </NavigationContainer>
  )
}