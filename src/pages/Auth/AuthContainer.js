import { View, Text } from 'react-native';
import AuthPresenter from './AuthPresenter';

export default function AuthContainer({
    navigation
}) {
    const move = () => {
        navigation.navigate('main')
    }

    return (
        <AuthPresenter 
            move={move}
        />
    )
}