import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { PermissionsAndroid, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import { AndroidPose } from "./AndroidPose";

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

export default function Pose() {
    const WEB_URL = "https://front-real-demo.vercel.app/";
    const webViewRef = useRef<any>(null);

    const [permission, askPermission] = Permissions.usePermissions(
        Permissions.CAMERA,
        { ask: true }
    );

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
        <>
            {Platform.OS === "android" ? (
                <AndroidPose />
            ) : (
                <View style={styles.webview}>
                    <WebView
                        ref={webViewRef}
                        source={{ uri: WEB_URL }}
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
                            console.log(
                                "📩 WebView Message:",
                                event.nativeEvent.data
                            )
                        }
                        injectedJavaScript={injectedJavaScript} // 📌 WebView에서 강제로 manifest.json 요청
                        onPermissionRequest={(event: any) => {
                            console.log("🔓 권한 요청:", event);
                            event.grant(event.resources); // 자동으로 카메라 권한 허용
                        }}
                        thirdPartyCookiesEnabled={false}
                    />
                </View>
            )}
        </>
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
