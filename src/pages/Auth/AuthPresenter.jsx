import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function AuthPresenter({move, navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOGO</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => move('supervisor')}>
                    <Text style={styles.buttonText}>감독자</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => move('student')}>
                    <Text style={styles.buttonText}>학생</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation('Login')}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignitems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        alignItems:'center',
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#E4EFFF',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignitems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
    },
    loginButtonText: {
        // flex: 1,
        width: '100%',
        color: '#000000',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
})