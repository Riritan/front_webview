import { View, Text } from 'react-native';
import AuthPresenter from './AuthPresenter';

export default function AuthContainer({
    navigation
}) {
    const move = () => {
        navigation.navigate('main')
    }
    const navigate = () => {
        navigation.navigate('Login');
    }
    

    return (
        <AuthPresenter 
            move={move}

            navigation={navigate}
        />

        
    )
}