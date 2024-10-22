import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/DeleteConfirmation.css';

interface DeleteCProps {
    exerciseId:string;
    onClose: () => void;
    onSuccess: ()=> void;
}
  
  const DeleteExercise:React.FC<DeleteCProps> = ({onClose,exerciseId,onSuccess}) => {

    const deleteUser = async () => {
        try {
          await axios.delete(`http://localhost:8080/exercises/${exerciseId}`, {
            headers: {
              "Authorization": Cookies.get('token'),
            },
          });
          onSuccess()
          onClose();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

      return(
        <div className="delete-confirmation-overlay">
        <div className="delete-confirmation-dialog">
          <h2 className="delete-confirmation-title">Confirm Deletion</h2>
          <p className="delete-confirmation-description">
            Are you sure you want to delete this exercise? This action cannot be undone.
          </p>
          <div className="delete-confirmation-buttons">
            <button onClick={onClose} className="delete-confirmation-cancel">
              Cancel
            </button>
            <button onClick={deleteUser} className="delete-confirmation-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
      )

  }
  
  export default DeleteExercise