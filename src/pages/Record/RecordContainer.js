import { useState } from 'react';
import RecordPresenter from './RecordPresenter';

export default function RecordContainer({ navigation }){
    const move = (screen) => {
        navigation.navigate(screen);
    };
    

    return(
        <RecordPresenter 
            move={move}

        
        
        
        />
    )
}