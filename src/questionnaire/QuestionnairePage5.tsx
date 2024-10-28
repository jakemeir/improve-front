import React, { useState, useEffect } from 'react';
import ExportUserButton from '../components/ExportUserButton';
import CreateUser from '../components/CreateUser';
import { LogIn } from 'lucide-react';
import Login from '../components/Login';

interface QuestionnairePage5Props {
  onCompletion: (isComplete: boolean) => void;
}

const QuestionnairePage5: React.FC<QuestionnairePage5Props> = ({ onCompletion }) => {
  const [createUser, setCreateUser] = useState<string | null>(null);

  const isPage5Complete = !!createUser;

  useEffect(() => {
    onCompletion(isPage5Complete);
  }, [isPage5Complete, onCompletion]);

  return (
    <div className="page5-container">
      <form>
           <CreateUser onClose={()=>{}} isOpen={true}/> 
      </form>
    </div>
  );
};

export default QuestionnairePage5;
