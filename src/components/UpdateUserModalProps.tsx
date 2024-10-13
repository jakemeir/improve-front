import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'Admin' | 'User';
}

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedUser: User) => void;
  existingUserData: User | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isOpen, onClose, onSubmit, existingUserData }) => {
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (existingUserData) {
      setFormData(existingUserData);
    }
  }, [existingUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData(prev => ({ ...prev!, [name]: value })); // עדכון הנתונים
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSubmit(formData); // שליחה של הנתונים
      onClose(); // סגור את המודל
    }
  };

  if (!isOpen || !formData) return null; // אם המודל לא פתוח או אין נתונים, אל תציג אותו

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input" required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="input" required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="button saveButton">Update</button>
          <button type="button" className="button cancelButton" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
