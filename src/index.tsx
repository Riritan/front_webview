import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth, Main, Pose, Profile, Login, Register, Record, Planner  } from "./pages";
import { Profiler } from "react";

export default function Pages() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='auth' component={Auth} />
            <Stack.Screen name='main' component={Main} />
            <Stack.Screen name='pose' component={Pose} />
            <Stack.Screen name='myPage' component={Profile} />
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={Register}/>
            <Stack.Screen name='record' component={Record}/>
            <Stack.Screen name='planner' component={Planner}/>
        </Stack.Navigator>
    )
}