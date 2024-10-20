import React, { useEffect, useState } from 'react'
import { Train } from '../types/types';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UpdateExercise from './UpdateExercise';
import CreateExercise from './CreateExercise';

const TrainingPage = () => {

  const [training, setTraining] = useState<Train[]>([]);
  const [isEditOpen,setIsEditOpen] = useState<boolean>(false)
  const [isCreateOpen,setIsCreateOpen] = useState<boolean>(false)
  const [exerciseId, setExerciseId] = useState<string>('')

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/exercises', {
          headers: {
            "Authorization": Cookies.get('token')
          }
        });
        setTraining(response.data.data);
      } catch (error) {
        console.error('Error fetching training data:', error);
      }
    };

    fetchTrainingData();
  }, []);

  const handleCreateClick = () => {
    setIsCreateOpen(!isCreateOpen)

  };

  const handleEditClick = (trainId: string) => {
    setExerciseId(trainId)
    setIsEditOpen(!isEditOpen)

  };
  const handleDeleteClick = (trainId: string) => { };


  return (
    <div className="table-container">
      <button onClick={handleCreateClick}>create</button>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">Exercise Name</th>
            <th className="table-header-cell">Description</th>
            <th className="table-header-cell">Sets</th>
            <th className="table-header-cell">Times</th>
            <th className="table-header-cell">Category</th>
            <th className="table-header-cell">Status</th>
            <th className="table-header-cell">Image</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {training.map((train) => (
            <tr key={train._id}>
              <td className="table-cell">{train.name}</td>
              <td className="table-cell">{train.description}</td>
              <td className="table-cell">{train.sets}</td>
              <td className="table-cell">{train.times}</td>
              <td className="table-cell">{train.category}</td>
              <td className="table-cell">{train.status ? 'Active' : 'Inactive'}</td>
              <td className="table-cell"><img src={`http://localhost:8080/${train.imgPath}`} style={{width:100}} alt="Exercise" /></td>
              <td className="table-cell">
                <button onClick={() => handleEditClick(train._id)} className="action-button"><Edit size={16} /></button>
                <button onClick={() => handleDeleteClick(train._id)} className="delete-button"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditOpen&&<UpdateExercise exerciseId={exerciseId} onClose={()=>{handleEditClick(exerciseId)}}  isOpen={isEditOpen}/>}
        {isCreateOpen&&<CreateExercise onClose={()=>{handleCreateClick()}} isOpen={isCreateOpen}/>}
    </div>
  )
}

export default TrainingPage;