import { View, Text } from 'react-native';
import MainPresenter from './MainPresenter';

export default function MainContainer({
    navigation
}) {
    const move = () => {
        navigation.navigate('pose');
    }

    return (
        <MainPresenter 
            move={move}
        />
    )
}