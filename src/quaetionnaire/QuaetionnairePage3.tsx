import React, { useState, useEffect } from 'react';

interface QuaetionnairePage3Props {
  onCompletion: (isComplete: boolean) => void;
}

const QuaetionnairePage3: React.FC<QuaetionnairePage3Props> = ({ onCompletion }) => {
  const [physicalCondition, setPhysicalCondition] = useState<string | null>(null);

  const isPage3Complete = !!physicalCondition;

  useEffect(() => {
    onCompletion(isPage3Complete);
  }, [isPage3Complete, onCompletion]);

  return (
    <div className="page3-container">
      <form>
        <fieldset>
          <legend>How many time are you training in weak</legend>
          <div>
            <input
              type="radio"
              id="none"
              name="fitness"
              value="none"
              onChange={() => setPhysicalCondition('none')}
            />
            <label htmlFor="none">not at all</label>
          </div>
          <div>
            <input
              type="radio"
              id="1-2"
              name="fitness"
              value="1-2"
              onChange={() => setPhysicalCondition('1-2')}
            />
            <label htmlFor="1-2">1-2 times</label>
          </div>
          <div>
            <input
              type="radio"
              id="2-3"
              name="fitness"
              value="2-3"
              onChange={() => setPhysicalCondition('2-3')}
            />
            <label htmlFor="2-3">2-3 times</label>
          </div>
          <div>
            <input
              type="radio"
              id="upTo-4"
              name="fitness"
              value="upTo-4"
              onChange={() => setPhysicalCondition('upTo-4')}
            />
            <label htmlFor="upTo-4">Up to-4</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default QuaetionnairePage3;
