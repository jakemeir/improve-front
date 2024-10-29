import React,{useState,Dispatch,SetStateAction} from 'react'
import '../../style/Questionnaire.css'
import CreateUser from '../CreateUser';

interface QuestPage5Props {
    data:string;
    setPage:Dispatch<SetStateAction<number>>;
}

const QuestPage5 : React.FC<QuestPage5Props> = ({data,setPage}) => {

    return <CreateUser isOpen={true} onClose={()=>{setPage(6)}} additionalData={data}/>
}

export default QuestPage5;

