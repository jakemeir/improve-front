import React,{useState,Dispatch,SetStateAction} from 'react'
import '../../style/Questionnaire.css'

interface QuestPage1Props {
    setData:Dispatch<SetStateAction<string[]>>;
    setPage:Dispatch<SetStateAction<number>>;
}

const QuestPage1 : React.FC<QuestPage1Props> = ({setData,setPage}) => {
    const [gender, setGender] = useState<'male'|'female'|'stupid isaac'>('female');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [birthYear, setBirthYear] = useState<string>('');
    const [errors, setErrors] = useState<string>('')

    const submitHandler = ()=>{
        setData((prev)=>{
            const newArray = [...prev];
            newArray[0] = `${gender}${weight}${height}${birthYear}`;
            return newArray;
        })
        setPage(5)
    }


    const validateWeight = () => {
        setErrors(e=>+weight>0?'':'weight must be greater than zero')
    };

    const validateHeight = () => {
       setErrors(e=>+height>0?'':'height must be greater than zero')
    };
    
    const validateBirthYear = () => {
        setErrors(e=>+birthYear > 1935 && +birthYear < 2007?'':'you are not that old')
    };

  return (
    <div className='page1-container'>
        <form>
            <div>
                <label>נקבה</label>
                <input defaultChecked type="radio" name="gender" value="female" onChange={() => setGender('female')} />
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
                validateWeight();
            }}
            />
            </div>
            <div>
                <label>גובה</label>
                <input
                type="number"
                placeholder="ס'מ"
                value={height}
                onChange={(e) => {
                setHeight(e.target.value);
                validateHeight();
            }}
            />
            </div>
            <div>
                <label>שנת לידה</label>
                <input
                type="number"
                placeholder="שנה"
                value={birthYear}
                onChange={(e) => {
                setBirthYear(e.target.value);
                validateBirthYear();
            }}
            />
            </div>
            {errors&&<p className="error-message">{errors}</p>}
            <button type='button' onClick={submitHandler} disabled={!!errors||!gender||!weight||!height||!birthYear}>Next</button>
        </form>

    </div>
  )
}

export default QuestPage1;

