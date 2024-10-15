import React, { useState, useEffect } from 'react';

interface QuaetionnairePage2Props {
  onCompletion: (isComplete: boolean) => void;
}

const QuaetionnairePage2: React.FC<QuaetionnairePage2Props> = ({ onCompletion }) => {
  const [healthCondition, setHealthCondition] = useState<string | null>(null);

  const isPage2Complete = !!healthCondition;

  useEffect(() => {
    onCompletion(isPage2Complete);
  }, [isPage2Complete, onCompletion]);

  return (
    <div className="page2-container">
      <form>
        <fieldset>
          <legend>Please mark your situation</legend>
          <div>
            <input
              type="radio"
              id="cancer"
              name="health"
              value="cancer"
              onChange={() => setHealthCondition('cancer')}
            />
            <label htmlFor="cancer">Cancer</label>
          </div>
          <div>
            <input
              type="radio"
              id="diabetes"
              name="health"
              value="diabetes"
              onChange={() => setHealthCondition('diabetes')}
            />
            <label htmlFor="diabetes">Diabetes</label>
          </div>
          <div>
            <input
              type="radio"
              id="fatness"
              name="health"
              value="fatness"
              onChange={() => setHealthCondition('fatness')}
            />
            <label htmlFor="fatness">Fatness</label>
          </div>
          <div>
            <input
              type="radio"
              id="none"
              name="health"
              value="none"
              onChange={() => setHealthCondition('none')}
            />
            <label htmlFor="none">None of these</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default QuaetionnairePage2;
