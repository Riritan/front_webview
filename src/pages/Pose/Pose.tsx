import { useEffect, useRef, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View, Platform, PermissionsAndroid } from 'react-native';
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

    const postureStatusRef = useRef<'correct' | 'tilted' | 'lying'>('correct');
    const continuousBadPostureTimeRef = useRef(0); // 나쁜 자세 연속시간
    const continuousCorrectedTimeRef = useRef(0);  // 정자세 연속시간

    useEffect(() => {
        requestPermissions();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            updatePosture();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const injectedJavaScript = `
        (function() {
            fetch('/manifest.json')
                .then(response => console.log('📥 manifest.json 로드됨:', response))
                .catch(error => console.error('❌ manifest.json 로드 실패:', error));
        })();
    `;

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

    const handleWebViewMessage = (event: WebViewMessageEvent) => {
        const data = event.nativeEvent.data;
        if (data === 'tilted' || data === 'correct' || data === 'lying') {
            postureStatusRef.current = data;
        }
    };

    return (
        <View style={styles.container}>
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
                injectedJavaScript={injectedJavaScript}
                thirdPartyCookiesEnabled={false}
            />

            {/* ✅ 모달창만 표시 */}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
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
