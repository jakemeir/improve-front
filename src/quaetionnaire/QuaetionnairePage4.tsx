import React, { useState, useEffect } from 'react';

interface QuaetionnairePage4Props {
  onCompletion: (isComplete: boolean) => void;
}

const QuaetionnairePage4: React.FC<QuaetionnairePage4Props> = ({ onCompletion }) => {
  const [mantra, setMantra] = useState<string | null>(null);

  const isPage4Complete = !!mantra;

  useEffect(() => {
    onCompletion(isPage4Complete);
  }, [isPage4Complete, onCompletion]);

  return (
    <div className="page4-container">
      <form>
        <fieldset>
          <legend>What are the goals you want to achive?</legend>
          <div>
            <input
              type="radio"
              id="getBetter"
              name="goal"
              value="getBetter"
              onChange={() => setMantra('getBetter')}
            />
            <label htmlFor="beBetter">Be healthier</label>
          </div>
          <div>
            <input
              type="radio"
              id="weight"
              name="goal"
              value="weight"
              onChange={() => setMantra('weight')}
            />
            <label htmlFor="weight">lose weight</label>
          </div>
          <div>
            <input
              type="radio"
              id="mass"
              name="goal"
              value="mass"
              onChange={() => setMantra('mass')}
            />
            <label htmlFor="mass">inceasing muscle mass</label>
          </div>
          <div>
            <input
              type="radio"
              id="stamina"
              name="goal"
              value="stamina"
              onChange={() => setMantra('stamina')}
            />
            <label htmlFor="stamina">improving stamina</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default QuaetionnairePage4;
