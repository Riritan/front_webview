import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { PermissionsAndroid, Platform } from "react-native";

const requestPermissions = async () => {
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);

            if (
                granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log("✅ 카메라 및 마이크 권한 허용됨");
            } else {
                console.log("❌ 카메라 또는 마이크 권한 거부됨");
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

export default function App() {
    const webViewRef = useRef<any>(null);

    useEffect(() => {
        requestPermissions();
    }, []);

    useEffect(() => {
        if (webViewRef.current) {
            webViewRef.current.clearCache(true);
        }
    }, []);

    const injectedJavaScript = `
        (function() {
            fetch('/manifest.json')
                .then(response => console.log('📥 manifest.json 로드됨:', response))
                .catch(error => console.error('❌ manifest.json 로드 실패:', error));
        })();
    `;

    return ( 
        <View style={styles.webview}>
            <WebView
                ref={webViewRef}
                source={{ uri: "https://0343-203-241-183-7.ngrok-free.app" }}
                style={styles.webview}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                originWhitelist={["*"]}
                incognito={true}
                cacheEnabled={false}
                clearCache={true}
                mixedContentMode="always"
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                onMessage={(event) =>
                    console.log("📩 WebView Message:", event.nativeEvent.data)
                }
                injectedJavaScript={injectedJavaScript} // 📌 WebView에서 강제로 manifest.json 요청
                onPermissionRequest={(event: any) => {
                    console.log("🔓 권한 요청:", event);
                    event.grant(); // 자동으로 카메라 권한 허용
                }}
                thirdPartyCookiesEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    web: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffff00",
    },
    webview: {
        flex: 1,
    },
});
