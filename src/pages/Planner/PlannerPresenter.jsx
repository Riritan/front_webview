import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const PlannerPresenter = ({
    currentDate,
    onPrevDate,
    onNextDate,
    inputText,
    onChangeInput,
    onAddPlan,
    plans,
    onRemovePlan
}) => {
    return (
        <View style={styles.container}>
            {/* 날짜 헤더 + 이동 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onPrevDate}>
                    <Text style={styles.arrow}>◀︎</Text>
                </TouchableOpacity>

                <Text style={styles.dateText}>
                    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {currentDate.getDate()}일의 공부 계획
                </Text>

                <TouchableOpacity onPress={onNextDate}>
                    <Text style={styles.arrow}>▶︎</Text>
                </TouchableOpacity>
            </View>

            {/* 입력창 및 추가 버튼 */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="계획을 입력하세요"
                    value={inputText}
                    onChangeText={onChangeInput}
                />
                <TouchableOpacity onPress={onAddPlan}>
                    <Text style={styles.addButton}>추가</Text>
                </TouchableOpacity>
            </View>

            {/* 계획 리스트 */}
            <FlatList
                data={plans}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{item}</Text>
                        <TouchableOpacity onPress={() => onRemovePlan(index)}>
                            <Text style={styles.deleteButton}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Text style={styles.status}>오늘의 목표: {plans.length}개 달성하기‼️ </Text>
        </View>
    );
};

export default PlannerPresenter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 8,
    },
    addButton: {
        fontSize: 16,
        color: '#007AFF',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginVertical: 6,
    },
    cardText: {
        fontSize: 16,
    },
    deleteButton: {
        color: 'red',
        fontSize: 14,
    },
    status: {
        textAlign: 'center',
        color: '#555',
        marginTop: 20,
    },
});
