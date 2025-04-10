import { useState } from "react";
import Super_InforPresenter from "./Super_InforContainer";

export default function Super_InforContainer({ navigation }) {
    const move = (screen) => {
        navigation.navigate(screen);
    };

    // 상태 관리
    const [studentCode, setStudentCode] = useState("#2567"); // 학생 코드
    const [motivationMsg, setMotivationMsg] = useState(true); // 동기부여 메시지
    const [totalStudyTime, setTotalStudyTime] = useState(true); // 총 학습시간
    const [subjectStudyTime, setSubjectStudyTime] = useState(true); // 과목별 학습시간

    // D-Day 관리 상태
    const [dDayList, setDDayList] = useState([
        { id: 1, label: "수능", days: -300, isEnabled: true },
        { id: 2, label: "수행평가 마감", days: -30, isEnabled: false },
        { id: 3, label: "중간고사", days: -10, isEnabled: false },
        { id: 4, label: "재수", days: -665, isEnabled: true },
    ]);

    // D-Day 스위치 토글 함수
    const toggleDDay = (id) => {
        setDDayList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isEnabled: !item.isEnabled } : item
            )
        );
    };

    return (
        <ProfilePresenter
            move={move}
            studentCode={studentCode}
            motivationMsg={motivationMsg}
            totalStudyTime={totalStudyTime}
            subjectStudyTime={subjectStudyTime}
            setMotivationMsg={setMotivationMsg}
            setTotalStudyTime={setTotalStudyTime}
            setSubjectStudyTime={setSubjectStudyTime}
            dDayList={dDayList}
            toggleDDay={toggleDDay}
        />
    );
}
