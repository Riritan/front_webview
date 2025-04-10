import React from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function LoginPresenter({ username, setUsername, password, setPassword, handleLogin, message, navigation})
{
    return (
        <View Style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="사용자 이름"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="로그인" onPress={handleLogin}/>
            {message ? <Text>{message}</Text> : null}

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation('Register')}>
                <Text style={styles.registerButtonText}>회원가입</Text>
            </TouchableOpacity>
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,

    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
    },
    registerButton:{
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center', 
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    }, 
})

