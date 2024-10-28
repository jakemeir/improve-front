import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/DeleteConfirmation.css';

interface DeleteRProps {
    recipeId:string;
    onClose: () => void;
    onSuccess: ()=> void;
}
  
  const DeleteRecipe:React.FC<DeleteRProps> = ({onClose,recipeId,onSuccess}) => {

    const deleteRecipeHandler = async () => {
        try {
          await axios.delete(`http://localhost:8080/recipes/${recipeId}`, {
            headers: {
              "Authorization": Cookies.get('token'),
            },
          });
          onSuccess()
          onClose();
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      };

      return(
        <div className="delete-confirmation-overlay">
        <div className="delete-confirmation-dialog">
          <h2 className="delete-confirmation-title">Confirm Deletion</h2>
          <p className="delete-confirmation-description">
            Are you sure you want to delete this recipe? This action cannot be undone.
          </p>
          <div className="delete-confirmation-buttons">
            <button onClick={onClose} className="delete-confirmation-cancel">
              Cancel
            </button>
            <button onClick={deleteRecipeHandler} className="delete-confirmation-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
      )

  }
  
  export default DeleteRecipe;