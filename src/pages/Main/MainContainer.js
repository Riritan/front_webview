import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MainPresenter from './MainPresenter';


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

    return (
        <MainPresenter 
            move={move}
            todos={todos} // todos를 MainPresenter에 전달
            onTodoChange={handleChange} // onTodoChange 함수를 MainPresenter에 전달
            checkedItems={checkedItems}
            onCheckChange={handleCheckChange}
        />
    );
}
