import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, CameraType, CameraView } from "expo-camera";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";

const TensorCamera = cameraWithTensors(CameraView);

const LEAVE_TIME_SEC = 5;

type PoseType = "정자세" | "기울어짐" | "엎드림" | "자리비움" | "";

export function AndroidPose() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [poseText, setPoseText] = useState("");
    const [poseDurations, setPoseDurations] = useState({
        정자세: 0,
        기울어짐: 0,
        엎드림: 0,
        자리비움: 0,
        "": 0,
    });

    const currentPoseRef = useRef<PoseType>("정자세");
    const poseStartTimeRef = useRef(Date.now());
    const poseDurationRef = useRef<Record<PoseType, number>>({
        ...poseDurations,
    });

    const checkLeaveRef = useRef(false);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const rafId = useRef<number | null>(null);

    const textureDims = { width: 1600, height: 1200 };

    useEffect(() => {
        (async () => {
            await tf.ready();
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    const updatePoseTime = (pose: PoseType) => {
        const now = Date.now();
        const elapsedTime = (now - poseStartTimeRef.current) / 1000;

        if (currentPoseRef.current) {
            poseDurationRef.current[currentPoseRef.current] += elapsedTime;
        }

        poseStartTimeRef.current = now;
        currentPoseRef.current = pose;
        setPoseDurations({ ...poseDurationRef.current });
    };

    const poseDetect = (pose: posenet.Pose) => {
        const keypoints = pose.keypoints.reduce((acc, kpt) => {
            acc[kpt.part] = kpt.position;
            return acc;
        }, {} as Record<string, { x: number; y: number }>);

        const leftShoulder = keypoints["leftShoulder"];
        const rightShoulder = keypoints["rightShoulder"];
        const nose = keypoints["nose"];

        if (!leftShoulder || !rightShoulder || !nose) return;

        const shoulderSlope = Math.abs(leftShoulder.y - rightShoulder.y);
        const shoulderCenter = {
            x: (leftShoulder.x + rightShoulder.x) / 2,
            y: (leftShoulder.y + rightShoulder.y) / 2,
        };
        const headPosition = nose.y - shoulderCenter.y;

        let status: PoseType = "";
        if (shoulderSlope < 20 && headPosition > -30 && headPosition < 30) {
            status = "정자세";
        } else if (shoulderSlope >= 20) {
            status = "기울어짐";
        } else {
            status = "엎드림";
        }

        if (currentPoseRef.current !== status) {
            updatePoseTime(status);
        }

        setPoseText(status);
    };

    const handleCameraStream = async (
        images: IterableIterator<tf.Tensor3D>,
        updatePreview: any,
        gl: ExpoWebGLRenderingContext
    ) => {
        const net = await posenet.load();

        const loop = async () => {
            const nextImageTensor = images.next().value;
            if (nextImageTensor) {
                const pose = await net.estimateSinglePose(nextImageTensor, {
                    flipHorizontal: true,
                });

                if (pose && pose.keypoints) {
                    poseDetect(pose);
                }

                tf.dispose([nextImageTensor]);
            }
            rafId.current = requestAnimationFrame(loop);
        };
        loop();
    };

    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>카메라 권한이 필요합니다</Text>;

    return (
        <View style={styles.container}>
            {hasPermission && (
                <TensorCamera
                    style={styles.camera}
                    cameraTextureHeight={textureDims.height}
                    cameraTextureWidth={textureDims.width}
                    facing={"front"}
                    useCustomShadersToResize={false}
                    resizeHeight={200}
                    resizeWidth={152}
                    resizeDepth={3}
                    autorender={true}
                    onReady={handleCameraStream}
                />
            )}
            <View style={styles.overlay}>
                <Text style={styles.text}>자세: {poseText}</Text>
                <Text style={styles.text}>
                    정자세: {poseDurations.정자세.toFixed(1)}초
                </Text>
                <Text style={styles.text}>
                    기울어짐: {poseDurations.기울어짐.toFixed(1)}초
                </Text>
                <Text style={styles.text}>
                    엎드림: {poseDurations.엎드림.toFixed(1)}초
                </Text>
                <Text style={styles.text}>
                    자리비움: {poseDurations.자리비움.toFixed(1)}초
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    overlay: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 10,
        borderRadius: 8,
    },
    text: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
});

// import React, { useEffect, useRef, useState } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { Camera, CameraType, CameraView } from "expo-camera";
// import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
// import * as tf from "@tensorflow/tfjs";
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
// import * as posenet from "@tensorflow-models/posenet";
// import { GLView } from "expo-gl";
// import { ExpoWebGLRenderingContext } from "expo-gl";

// // Convert Camera to TensorCamera
// const TensorCamera = cameraWithTensors(Camera);

// export default function PoseWithCamera() {
//     const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//     const [facing, setFacing] = useState<CameraType>("front");
//     const [poseData, setPoseData] = useState<any>(null);
//     const textureDims = { height: 1200, width: 1600 };

//     const rafId = useRef<number | null>(null);
//     const cameraRef = useRef(null);

//     useEffect(() => {
//         (async () => {
//             await tf.ready();
//             const { status } = await Camera.requestCameraPermissionsAsync();
//             setHasPermission(status === "granted");
//         })();

//         return () => {
//             if (rafId.current) {
//                 cancelAnimationFrame(rafId.current);
//             }
//         };
//     }, []);

//     const handleCameraStream = async (
//         images: any,
//         updatePreview: any,
//         gl: any
//     ) => {
//         const net = await posenet.load();

//         const loop = async () => {
//             const nextImageTensor = images.next().value;
//             if (nextImageTensor) {
//                 const pose = await net.estimateSinglePose(nextImageTensor, {
//                     flipHorizontal: false,
//                 });
//                 setPoseData(pose);
//                 tf.dispose([nextImageTensor]);
//             }
//             rafId.current = requestAnimationFrame(loop);
//         };
//         loop();
//     };

//     if (hasPermission === null) return <View />;
//     if (hasPermission === false) return <Text>카메라 권한이 필요합니다</Text>;

//     return (
//         <View style={styles.container}>
//             {/* 🟡 카메라 뷰 */}
//             <CameraView style={styles.camera} facing={facing} />

//             {/* 🔴 오버레이 텍스트 UI */}
//             <View style={styles.overlay}>
//                 {/* <Text style={styles.text}>자세: {poseText}</Text>
//                 <Text style={styles.text}>
//                     정자세: {poseDurations.정자세.toFixed(1)}초
//                 </Text>
//                 <Text style={styles.text}>
//                     기울어짐: {poseDurations.기울어짐.toFixed(1)}초
//                 </Text>
//                 <Text style={styles.text}>
//                     엎드림: {poseDurations.엎드림.toFixed(1)}초
//                 </Text>
//                 <Text style={styles.text}>
//                     자리비움: {poseDurations.자리비움.toFixed(1)}초
//                 </Text> */}
//             </View>

//             {/* 🔵 여기에 landmark 그릴 수 있는 Canvas 또는 GLView 추가 가능 */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     camera: {
//         ...StyleSheet.absoluteFillObject,
//         zIndex: 1,
//     },
//     overlay: {
//         position: "absolute",
//         top: 10,
//         left: 10,
//         zIndex: 2,
//         backgroundColor: "rgba(0, 0, 0, 0.4)",
//         padding: 10,
//         borderRadius: 8,
//     },
//     text: {
//         color: "red",
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 4,
//     },
//     centered: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });

// // import {
// //     CameraView,
// //     CameraType,
// //     useCameraPermissions,
// //     Camera,
// // } from "expo-camera";
// // import { useEffect, useRef, useState } from "react";
// // import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// // export function AndroidPose() {
// //     const [hasPermission, setHasPermission] = useState<boolean | null>(null);
// //     const [facing, setFacing] = useState<CameraType>("front");
// //     const [permission, setPermission] = useCameraPermissions();
// //     const cameraRef = useRef(null);

// //     useEffect(() => {
// //         (async () => {
// //             const { status } = await Camera.requestCameraPermissionsAsync();
// //             setHasPermission(status === "granted");
// //         })();
// //     }, []);

// //     if (hasPermission === null) return <View />;
// //     if (hasPermission === false)
// //         return (
// //             <View>
// //                 <Text>카메라 권한이 없습니다</Text>
// //             </View>
// //         );

// //     return (
// //         <View style={styles.webview}>
// //             <CameraView
// //                 ref={cameraRef}
// //                 style={styles.webview}
// //                 facing={facing}
// //             />
// //         </View>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     headerImage: {
// //         color: "#808080",
// //         bottom: -90,
// //         left: -35,
// //         position: "absolute",
// //     },
// //     titleContainer: {
// //         flexDirection: "row",
// //         gap: 8,
// //     },
// //     web: {
// //         width: "100%",
// //         height: "100%",
// //         backgroundColor: "#ffff00",
// //     },
// //     webview: {
// //         flex: 1,
// //     },
// // });
