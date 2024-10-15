import React, { useState } from 'react';
import QuaetionnairePage1 from './QuaetionnairePage1';
import QuaetionnairePage2 from './QuaetionnairePage2';
import QuaetionnairePage3 from './QuaetionnairePage3';
import QuaetionnairePage4 from './QuaetionnairePage4';
import QuaetionnairePage5 from './QuaetionnairePage5';
import '../style/quaetionnaire.css';

const QuaetionnaireLayout: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isPageComplete, setIsPageComplete] = useState<boolean[]>([false, false, false, false, false]); // Array for completion status

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
    <div className='quaetionnaire-container'>
      <p>Please answer all the questions</p>

      <div className='quaetionnaire-tags'>
        {page === 1 && <QuaetionnairePage1 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[0] = isComplete; return newArr; })} />}
        {page === 2 && <QuaetionnairePage2 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[1] = isComplete; return newArr; })} />}
        {page === 3 && <QuaetionnairePage3 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[2] = isComplete; return newArr; })} />}
        {page === 4 && <QuaetionnairePage4 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[3] = isComplete; return newArr; })} />}
        {page === 5 && <QuaetionnairePage5 onCompletion={(isComplete) => setIsPageComplete(prev => { const newArr = [...prev]; newArr[4] = isComplete; return newArr; })} />}
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

export default QuaetionnaireLayout;
