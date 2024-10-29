import React, { useState, useEffect } from 'react';

interface QuestionnairePage1Props {
  onCompletion: (isComplete: boolean) => void;
}

const QuestionnairePage1: React.FC<QuestionnairePage1Props> = ({ onCompletion }) => {
  const [gender, setGender] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');

  const [errors, setErrors] = useState({
    birthYear: '',
    weight: '',
    height: '',
  });

  const validateBirthYear = (year: string) => {
    const yearNum = parseInt(year);
    if (yearNum < 1935 || yearNum > 2007) {
      setErrors((prev) => ({ ...prev, birthYear: 'Birth year must be between 1935 and 2007' }));
    } else {
      setErrors((prev) => ({ ...prev, birthYear: '' }));
    }
  };

  const validateWeight = (weight: string) => {
    const weightNum = parseFloat(weight);
    if (weightNum <= 0) {
      setErrors((prev) => ({ ...prev, weight: 'Weight must be greater than 0' }));
    } else {
      setErrors((prev) => ({ ...prev, weight: '' }));
    }
  };

  const validateHeight = (height: string) => {
    const heightNum = parseFloat(height);
    if (heightNum <= 0) {
      setErrors((prev) => ({ ...prev, height: 'Height must be greater than 0' }));
    } else {
      setErrors((prev) => ({ ...prev, height: '' }));
    }
  };

  const isPage1Complete =
    gender && weight && height && birthYear && !errors.birthYear && !errors.weight && !errors.height;

  useEffect(() => {
    onCompletion(!!isPage1Complete); 
  }, [isPage1Complete, onCompletion]);

  return (
    <div className='page1-container'>

<form>
<div>

<label>נקבה</label>
<input type="radio" name="gender" value="female" onChange={() => setGender('female')} />
<label>זכר</label>
<input type="radio" name="gender" value="male" onChange={() => setGender('male')} />
</div>

<div>
<label>משקל</label>
<input
  type="number"
  placeholder="ק'ג"
  value={weight}
  onChange={(e) => {
    setWeight(e.target.value);
    validateWeight(e.target.value);
  }}
/>
{errors.weight && <p className="error-message">{errors.weight}</p>}
</div>

<div>
<label>גובה</label>
<input
  type="number"
  placeholder="ס'מ"
  value={height}
  onChange={(e) => {
    setHeight(e.target.value);
    validateHeight(e.target.value);
  }}
/>
{errors.height && <p className="error-message">{errors.height}</p>}
</div>

<div>
<label>שנת לידה</label>
<input
  type="number"
  placeholder="שנה"
  value={birthYear}
  onChange={(e) => {
    setBirthYear(e.target.value);
    validateBirthYear(e.target.value);
  }}
/>

</div>

</form>

      {errors.birthYear && <p className="error-message">{errors.birthYear}</p>}
    </div>
  );
};

export default QuestionnairePage1;
