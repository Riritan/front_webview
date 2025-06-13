import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PermissionsAndroid, Platform } from "react-native";
import Pages from '../src/index';
import { initDatabase } from '../src/db/db'; // 1. 데이터베이스 초기화 함수 가져오기


const requestPermissions = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED
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
    // --- 추가된 부분 ---
    const [isReady, setIsReady] = useState(false); // 2. 앱 준비 상태를 관리할 state 추가
    // ------------------

    const webViewRef = useRef<any>(null); // useRef 타입을 <any>에서 <null>로 변경하거나 WebView 타입으로 지정하는 것이 좋습니다.

    useEffect(() => {
        // --- 수정된 부분 ---
        const prepareApp = async () => {
            try {
                // 여러 비동기 준비 작업을 병렬로 실행할 수 있습니다.
                await Promise.all([
                    requestPermissions(),
                    initDatabase()
                ]);
                console.log('✅ 앱 준비 완료 (권한 및 데이터베이스)');
            } catch (e) {
                console.warn('❌ 앱 준비 중 오류 발생:', e);
            } finally {
                // 성공하든 실패하든 앱을 표시하도록 상태를 업데이트합니다.
                setIsReady(true);
            }
        };

        prepareApp();
        // ------------------
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
    <Pages />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  web: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffff00'
  },
  webview: {
    flex: 1,
  }
});
