import React, { useState, useEffect } from 'react';
import ExportUserButton from '../components/ExportUserButton';
import CreateUser from '../components/CreateUser';
import { LogIn } from 'lucide-react';
import Login from '../components/Login';

interface QuaetionnairePage5Props {
  onCompletion: (isComplete: boolean) => void;
}

const QuaetionnairePage5: React.FC<QuaetionnairePage5Props> = ({ onCompletion }) => {
  const [createUser, setCreateUser] = useState<string | null>(null);

  const isPage5Complete = !!createUser;

  useEffect(() => {
    onCompletion(isPage5Complete);
  }, [isPage5Complete, onCompletion]);

  return (
    <div className="page5-container">
      <form>
           <Login/> 
      </form>
    </div>
  );
};

export default QuaetionnairePage5;
