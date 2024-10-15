import React, { useState } from 'react'
import { Train } from '../types/types';
import { Edit } from 'lucide-react';

const TrainingPage = () => {

  const exampleTrain: Train = {
    _id: "12345",
    trainingName: "Full Body Workout",
    image: "https://example.com/image.jpg",
    sets: 3,
    secondaryCategory: "Strength Training",
    groups: ["Beginners", "Intermediate"],
    status: "active",
  };

  const [training, setTraining] = useState<Train[]>([
    {
    _id: "12345",
    trainingName: "Full Body Workout",
    image: "https://example.com/image.jpg",
    sets: 3,
    secondaryCategory: "Strength Training",
    groups: ["Beginners", "Intermediate"],
    status: "active",
  },
]);

  const handleEditClick = (trainId: string) => {};

  return (
    <div className="table-container">
        <table className="table">
            <thead>
                <tr className="table-header">
                  <th className="table-header-cell">Exercise Name</th>
                  <th className="table-header-cell">Image Display</th>
                  <th className="table-header-cell">Sets</th>
                  <th className="table-header-cell">Secondary Category</th>
                  <th className="table-header-cell">Groups</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
            </thead>
            <tbody>
              {training.map((train) => (
                <tr key={train._id}>
                  <td className="table-cell">{train.trainingName}</td>
                  <td className="table-cell"><img src={train.image} alt="Exercise" /></td>
                  <td className="table-cell">{train.sets}</td>
                  <td className="table-cell">{train.secondaryCategory}</td>
                  <td className="table-cell">{train.groups}</td>
                  <td className="table-cell">{train.status}</td>
                  <td className="table-cell">
                    <button onClick={() => handleEditClick(train._id)} className="action-button"><Edit size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default TrainingPage;