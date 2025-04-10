import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet} from "react-native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('users.db');

export default function RegisterPresenter({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);'
            );
        });
    }, []);

    const handleRegister = () => {
        if (username && password) {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO users (username, password) VALUES (?, ?);',
                    [username, password],
                    () => {
                        setMessage('회원가입 성공!');
                        navigation.navigate('Login');
                    },
                    (_, error) => {
                        setMessage('회원가입 실패: ' + error.message);
                    }
                );
            });
        } else {
            setMessage('모든 필드를 입력해야 합니다.');
        }
    };

    return (
        <View style={styles.container}>
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
            <Button title="회원가입" onPress={handleRegister}/>
             {message ? <Text>{message}</Text> : null}
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
})