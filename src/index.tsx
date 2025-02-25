import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth, Main, Pose } from "./pages";

export default function Pages() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='auth' component={Auth} />
            <Stack.Screen name='main' component={Main} />
            <Stack.Screen name='pose' component={Pose} />
        </Stack.Navigator>
    )
}