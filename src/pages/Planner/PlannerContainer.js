import React, { useState } from 'react';
import PlannerPresenter from './PlannerPresenter';

export default function PlannerContainer() {
    const [dateIndex, setDateIndex] = useState(0);
    const [plansByDate, setPlansByDate] = useState({});
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dateIndex); // Date 객체 유지

    const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
    const plans = plansByDate[formattedDate] || [];

    const [input, setInput] = useState('');

    const handleAddPlan = () => {
        if (input.trim() === '') return;
        setPlansByDate(prev => ({
            ...prev,
            [formattedDate]: [...(prev[formattedDate] || []), input]
        }));
        setInput('');
    };

    const handleRemovePlan = (index) => {
        setPlansByDate(prev => ({
            ...prev,
            [formattedDate]: prev[formattedDate].filter((_, i) => i !== index)
        }));
    };

    const handlePrevDate = () => {
        setDateIndex(prev => prev - 1);
    };

    const handleNextDate = () => {
        setDateIndex(prev => prev + 1);
    };

    return (
        <PlannerPresenter
            currentDate={currentDate} // Date 객체로 전달
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
            inputText={input}
            onChangeInput={setInput}
            onAddPlan={handleAddPlan}
            plans={plans}
            onRemovePlan={handleRemovePlan}
        />
    );
}
