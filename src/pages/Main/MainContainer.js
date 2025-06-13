import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MainPresenter from './MainPresenter';
import { createItem, readItems, updateItem, deleteItem } from "../../db/daManager"; 


export default function MainContainer({ navigation }) {
    // To-Do 항목 상태 관리
    const [todos, setTodos] = useState(Array(5).fill(""));
    const [checkedItems, setCheckedItems] = useState(Array(5).fill(false))

    const handleChange = (index, value) => {
        const newTodos = [...todos]
        newTodos[index] = value
        setTodos(newTodos)
    };

    const handleCheckChange = (index, newValue) => {
        const newCheckedItems = [...checkedItems]
        newCheckedItems[index] = newValue
        setCheckedItems(newCheckedItems)
    }

    const move = (path) => {
        navigation.navigate(path);
    };

        // DB 테스트 로직을 담은 함수
    const handleDbTest = async () => {
        try {
            console.log('--- 🚀 DB 테스트 시작 ---');

            // 1. CREATE
            console.log('1. 아이템 추가...');
            const newItemId = await createItem(`테스트 아이템 ${Date.now()}`);
            console.log(`✅ 추가 성공! ID: ${newItemId}`);

            // 2. READ
            console.log('\n2. 전체 아이템 조회...');
            let items = await readItems();
            console.log('✅ 조회 결과:', items);

            // // 3. UPDATE
            // console.log(`\n3. ID ${newItemId} 아이템 수정...`);
            // const changes = await updateItem(newItemId, '✨ 수정된 아이템');
            // console.log(`✅ 수정 성공! 변경된 행 수: ${changes}`);
            // items = await readItems();
            // console.log('✅ 수정 후 데이터:', items);
            
            // // 4. DELETE
            // console.log(`\n4. ID ${newItemId} 아이템 삭제...`);
            // const deletedChanges = await deleteItem(newItemId);
            // console.log(`✅ 삭제 성공! 변경된 행 수: ${deletedChanges}`);
            // items = await readItems();
            // console.log('✅ 삭제 후 데이터:', items);

            console.log('\n--- ✅ DB 테스트 종료 ---');

        } catch (error) {
            console.error('❌ DB 테스트 중 오류 발생:', error);
        }
    };

    return (
        <MainPresenter 
            move={move}
            todos={todos} // todos를 MainPresenter에 전달
            onTodoChange={handleChange} // onTodoChange 함수를 MainPresenter에 전달
            checkedItems={checkedItems}
            onCheckChange={handleCheckChange}
            onDbTest={handleDbTest} // presenter에 함수 전달
        />
    );
}
