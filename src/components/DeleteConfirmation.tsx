import React from 'react';
import '../style/DeleteConfirmation.css';
import axios from 'axios';
import Cookies from 'js-cookie';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userId: string;
  userName: string; 
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({  isOpen,  onClose,  onConfirm,  userId, userName}) => {

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          "Authorization": Cookies.get('token'),
        },
      });
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-dialog">
        <h2 className="delete-confirmation-title">Confirm Deletion</h2>
        <p className="delete-confirmation-description">
          Are you sure you want to delete the user {userName}? This action cannot be undone.
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
  );
};

export default DeleteConfirmation;