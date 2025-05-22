import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TopBar } from './../../components/TopBar/TopBar';

export default function RecordPresenter({
    //DB 연결하면 props로 데이터 받기
    postureTime = {
        바른자세: "20:00",
        기울어짐: "03:00",
        옆드림: "40:00",
        자리비움: "10:00"
    }
}) {
    return (
        <ScrollView style={styles.container}>
            <TopBar />
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>자세별 시간</Text>
                <View Style={styles.card}>
                    {Object.entries(postureTime).map(([label, time]) => (
                        <View key={label} style={styles.row}>
                            <Text style={styles.label}>{label}</Text>
                            <Text style={styles.time}>{time}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    section: {
        marginTop: 20,    
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#E8F1FF",
        borderRadius: 12,
        padding: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#d0dce8",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    },
    time: {
        fontSize: 16,
        fontWeight: "500",
    },
});