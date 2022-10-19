import { MaterialIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Platform } from "react-native"
import { useTheme } from "styled-components"
import { Dashboard } from "../screens/dashboard"
import { Register } from "../screens/Register"
import { SignIn } from "../screens/SignIn"

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors } = useTheme()
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 68,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons name='format-list-bulleted' size={size} color={color} />
          )
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons name='attach-money' size={size} color={color} />
          )
        }}
      />
      <Screen
        name="Resumo"
        component={SignIn}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons name='pie-chart' size={size} color={color} />
          )
        }}
      />
    </Navigator>
  )
}