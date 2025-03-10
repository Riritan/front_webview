import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function MainPresenter({move}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                LOGO
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => move('startLearning')}>
            <Text style={styles.buttonText}>학습 시작</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => move('learningJournal')}>
                <Text style={styles.buttonText}>학습 일지</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => move('learningStatistics')}>
            <Text style={styles.buttonText}>학습 통계</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => move('myPage')}>
                <Text style={styles.buttonText}>마이페이지</Text>
            </TouchableOpacity>      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#E4EFFF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
    }
    
})