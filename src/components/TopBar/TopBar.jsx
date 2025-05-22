import { useNavigation } from "expo-router";
import React, { Children } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";


export const TopBar = ({
    children,
    studentCode,
}) => {
    const navigation = useNavigation();
    
    return(
        <View>
            {children}
            <View>
                {/* 상단 프로필 정보 */}
                <View style={styles.profileContainer}>
                    <Image source={require('../../../assets/images/profile.png')} style={styles.profileImage} />
                    <View style={styles.profileTextContainer}>
                        <Text style={styles.name}>OOO님</Text>
                        <Text style={styles.greeting}>오늘 하루도 힘내세요</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>프로필 사진 변경</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 학생 코드 영역 */}
                <View style={styles.studentCodeContainer}>
                    <Text style={styles.studentCodeLabel}>학생코드</Text>
                    <Text style={styles.studentCode}>{studentCode}</Text>
                    <TouchableOpacity>
                        <Text style={styles.changeCode}>학생코드 변경</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F1FF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    profileTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 16,
        marginBottom: 5,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    studentCodeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    studentCodeLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    studentCode: {
        fontSize: 22,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        textAlign: 'center',
    },
    changeCode: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    switchContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 텍스트와 스위치 좌우 정렬
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    switchLabel: {
        fontSize: 18,
    },
});