import React from "react";
import RegisterPresenter from "./RegisterPresenter"
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator()

export default function RegisterContainer({ navigation }) {
    
    return (
        <RegisterPresenter
            navigation={navigation}
        />
    )
}