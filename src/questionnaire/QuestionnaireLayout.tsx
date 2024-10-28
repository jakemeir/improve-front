import React, { useState } from 'react';
import QuestionnairePage1 from './QuestionnairePage1';
import QuestionnairePage2 from './QuestionnairePage2';
import QuestionnairePage3 from './QuestionnairePage3';
import QuestionnairePage4 from './QuestionnairePage4';
import QuestionnairePage5 from './QuestionnairePage5';
import '../style/Questionnaire.css';

const QuestionnaireLayout: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isPageComplete, setIsPageComplete] = useState<boolean[]>([false, false, false, false, false]); // Array for completion status
  const [info, setInfo] = useState<string>('')

  // Function to handle navigation between pages
  const nextPage = () => {
    if (isPageComplete[page - 1]) {
      setPage(prevPage => (prevPage < isPageComplete.length ? prevPage + 1 : prevPage));
    }
  };

  const prevPage = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className='questionnaire-container'>
      <p>Please answer all the questions</p>

      <div className='questionnaire-tags'>
        {page === 1 && <QuestionnairePage1 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[0] = isComplete; return newArr; })} />}
        {page === 2 && <QuestionnairePage2 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[1] = isComplete; return newArr; })} />}
        {page === 3 && <QuestionnairePage3 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[2] = isComplete; return newArr; })} />}
        {page === 4 && <QuestionnairePage4 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[3] = isComplete; return newArr; })} />}
        {page === 5 && <QuestionnairePage5 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[4] = isComplete; return newArr; })} />}
      </div>

      <div className='navigation-buttons'>
        {page > 1 && <button onClick={prevPage}>Previous</button>}
        <button onClick={nextPage} disabled={!isPageComplete[page - 1]}>
          {page === 5 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireLayout;
