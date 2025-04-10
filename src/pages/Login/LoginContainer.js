import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPresenter from "./LoginPresenter";
import AuthPresenter from "../Auth/AuthPresenter"; // ---> None of these files exist 오류뜸 수정필요

const Stack = createNativeStackNavigator();



export default function LoginContainer({ navigation }) {

    const navigate = () => {
        navigation.navigate('Register')
    }
    return (
        // <Stack.Navigator initialRouteName="Auth">
        //     <Stack.Screen name="Auth" component={AuthPresenter} />
        //     <Stack.Screen name="Login" component={LoginPresenter} />
        // </Stack.Navigator>
        <LoginPresenter
          navigation = {navigate}
        />
    )
}