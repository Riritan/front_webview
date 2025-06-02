import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View, Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

const requestPermissions = async () => {
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
            if (granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("✅ 카메라 권한 허용됨");
            } else {
                console.log("❌ 카메라 권한 거부됨");
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

export default function Pose() {
    const WEB_URL = 'https://front-real-demo.vercel.app/';
    const webViewRef = useRef<WebView>(null);

    const [isModalShown, setIsModalShown] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [shoulderSlope, setShoulderSlope] = useState('0.0');
    const [headOffset, setHeadOffset] = useState('0.0');
    const [poseText, setPoseText] = useState('');
    const [poseDurations, setPoseDurations] = useState({
        정자세: 0,
        기울어짐: 0,
        엎드림: 0,
        자리비움: 0,
    });

    const postureStatusRef = useRef<'correct' | 'tilted' | 'lying'>('correct');
    const continuousBadPostureTimeRef = useRef(0);
    const continuousCorrectedTimeRef = useRef(0);

    useEffect(() => {
        requestPermissions();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            updatePosture();
        }, 1000);
        return () => clearInterval(interval);
    }, [isModalShown]);

    const updatePosture = () => {
        const status = postureStatusRef.current;
        if (status === 'tilted' || status === 'lying') {
            continuousBadPostureTimeRef.current += 1;
            continuousCorrectedTimeRef.current = 0;
            if (continuousBadPostureTimeRef.current >= 20 && !isModalShown) {
                setIsModalShown(true);
                if (status === 'lying') {
                    setModalMessage("20초 이상 연속으로 엎드린 자세입니다! 허리를 곧게 펴세요!");
                } else {
                    setModalMessage("20초 이상 연속으로 기울어진 자세입니다! 바른 자세로 돌아가세요!");
                }
            }
        } else if (status === 'correct') {
            if (isModalShown) {
                continuousCorrectedTimeRef.current += 1;
                if (continuousCorrectedTimeRef.current >= 3) {
                    setIsModalShown(false);
                    continuousBadPostureTimeRef.current = 0;
                    continuousCorrectedTimeRef.current = 0;
                }
            } else {
                continuousBadPostureTimeRef.current = 0;
                continuousCorrectedTimeRef.current = 0;
            }
        }
    };

    // [수정2] onMessage에서 데이터 콘솔 로그 추가(디버깅)
    const handleWebViewMessage = (event: WebViewMessageEvent) => {
        console.log("WebView message:", event.nativeEvent.data); // [수정2] 추가

        try {
            const data = JSON.parse(event.nativeEvent.data);

            if (typeof data.pose === 'string') setPoseText(data.pose);
            if (typeof data.shoulderSlope === 'string' || typeof data.shoulderSlope === 'number')
                setShoulderSlope(String(data.shoulderSlope));
            if (typeof data.headOffset === 'string' || typeof data.headOffset === 'number')
                setHeadOffset(String(data.headOffset));
            if (typeof data.durations === 'object' && data.durations !== null)
                setPoseDurations(data.durations);

            if (data.pose === '기울어짐') postureStatusRef.current = 'tilted';
            else if (data.pose === '엎드림') postureStatusRef.current = 'lying';
            else if (data.pose === '정자세') postureStatusRef.current = 'correct';

            if (data.type === 'BAD_POSTURE_WARNING' && data.message) {
                setModalMessage(data.message);
                setIsModalShown(true);
            }
        } catch (e) {
            const msg = event.nativeEvent.data;
            if (msg === 'tilted' || msg === 'correct' || msg === 'lying') {
                postureStatusRef.current = msg;
            }
        }
    };

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: 'black' },
        infoBox: {
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 10,
            padding: 0,
        },
        infoText: {
            color: 'red',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: 'left',
            includeFontPadding: false,
            textAlignVertical: 'top',
        },
        webview: { flex: 1 },
        modalBackground: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            width: 280,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
        },
        modalText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'red',
            marginBottom: 20,
            textAlign: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>자세: {poseText}</Text>
                <Text style={styles.infoText}>어깨 기울기: {shoulderSlope}</Text>
                <Text style={styles.infoText}>머리 위치: {headOffset}</Text>
                <Text style={styles.infoText}>정자세: {poseDurations.정자세?.toFixed(1) ?? '0.0'}초</Text>
                <Text style={styles.infoText}>기울어짐: {poseDurations.기울어짐?.toFixed(1) ?? '0.0'}초</Text>
                <Text style={styles.infoText}>엎드림: {poseDurations.엎드림?.toFixed(1) ?? '0.0'}초</Text>
                <Text style={styles.infoText}>자리비움: {poseDurations.자리비움?.toFixed(1) ?? '0.0'}초</Text>
            </View>

            <WebView
                ref={webViewRef}
                source={{ uri: WEB_URL }}
                style={styles.webview}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                originWhitelist={['*']}
                incognito={true}
                cacheEnabled={false}
                mixedContentMode="always"
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                onMessage={handleWebViewMessage}
                thirdPartyCookiesEnabled={false}
            />

            <Modal
                visible={isModalShown}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalShown(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <Button title="닫기" onPress={() => setIsModalShown(false)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
