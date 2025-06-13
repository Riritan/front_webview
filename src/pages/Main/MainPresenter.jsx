import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import CheckBox from 'expo-checkbox';

export default function MainPresenter({
    move,
    todos,
    onTodoChange,
    checkedItems,
    onCheckChange,
    onDbTest
}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                LOGO
            </Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => move('pose')}>
            <Text style={styles.buttonText}>학습 시작</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => move('planner')}>
                <Text style={styles.buttonText}>스터디플래너</Text>
            </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => move('record')}>
            <Text style={styles.buttonText}>학습 통계</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => move('myPage')}>
                <Text style={styles.buttonText}>마이페이지</Text>
            </TouchableOpacity>       
            </View>

            {/* 2. DB 테스트를 위한 버튼 추가 */}
            <TouchableOpacity style={styles.testButton} onPress={onDbTest}>
                <Text style={styles.buttonText}>DB 테스트 실행 (콘솔 확인)</Text>
            </TouchableOpacity>


            <View style={styles.todoContainer}>
                <Text style={styles.todoTitle}>
                    To Do List✔️
                </Text>
                {todos.map((todo, index) => (
                    <View key={index} style={styles.todoItem}>
                        <CheckBox
                            value={checkedItems[index] || false}
                            onValueChange={(newValue) => onCheckChange(index, newValue)}
                            />         
                        <TextInput
                            key={index}
                            style={styles.todoInput}
                            value={todo}
                            onChangeText={(value) => onTodoChange(index, value)}
                            />
                    </View>

                    ))}
            </View>
                
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#E4EFFF',
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 5,
        flex: 1, 
        alignItems: 'center',
    },
        // 3. 테스트 버튼 스타일 추가
    testButton: {
        backgroundColor: '#ffc107', // 눈에 띄는 색상
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
    },
    todoContainer: {
        marginTop: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E4EFFF',
        borderRadius: 5,
        width: '80%',
        backgroundColor: '#FFFFFF',
    },
    todoTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    todoInput: {
        borderWidth: 1,
        borderColor: '#E4EFFF',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        flex: 1,
    },

    
})