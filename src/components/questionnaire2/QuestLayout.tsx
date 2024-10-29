import React, { useState } from 'react';
import QuestPage1 from './QuestPage1';
import QuestPage5 from './QuestPage5';
import { useNavigate} from 'react-router-dom';


const QuestLayout: React.FC = () => {
    const [data,setData] =  useState<string[]>([]);
    const [page,setPage] = useState<number>(1)
    const navigate =  useNavigate()
    if(page === 6){
       navigate('/')
    }

    return (
        <div className='questionnaire-container'>
          <p>Please answer all the questions</p>
    
          <div className='questionnaire-tags'>
            {page === 1 && <QuestPage1 setData={setData} setPage={setPage}/>}
            {page === 5 && <QuestPage5 data={data.join(' ')} setPage={setPage}/>}
          </div>
        </div>
      );
};

export default QuestLayout;