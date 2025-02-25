import { View, Text, TouchableOpacity } from "react-native"

export default function MainPresenter({
    move,
}) {
    return (
        <View>
            <Text>
                Auth Presenter
            </Text>
            <TouchableOpacity onPress={move}>
                <Text>
                    Press
                </Text>
            </TouchableOpacity>
        </View>
    )
}