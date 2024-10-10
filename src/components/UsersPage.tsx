import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import DeleteConfirmation from './DeleteConfirmation';
import '../style/UsersPage.css';
import SearchBox from './SearchBox';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'Admin' | 'User';
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, firstName: 'Israel', lastName: 'Sternglanz', email: 'abc@example.com', phoneNumber: '123-456-7890', password: '', role: 'Admin' },
    { id: 2, firstName: 'Abraham', lastName: 'Cohen', email: '123@example.com', phoneNumber: '098-765-4321', password: '', role: 'User' },
  ]);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
  };

  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers(users.filter(user => user.id !== deletingUser.id));
      setDeletingUser(null);
    }
  };

  return (
    <div className="users-container">
      <div className="user-controls">
        <button className="add-button">
          <PlusCircle size={20} className="add-button-icon" />
          Add New User
        </button>
        <SearchBox /> {/* Placing SearchBox next to the button */}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">First Name</th>
              <th className="table-header-cell">Last Name</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">Phone Number</th>
              <th className="table-header-cell">Password</th>
              <th className="table-header-cell">Role</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="table-cell">{user.firstName}</td>
                <td className="table-cell">{user.lastName}</td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.phoneNumber}</td>
                <td className="table-cell">{user.password}</td>
                <td className="table-cell">{user.role}</td>
                <td className="table-cell">
                  <button className="action-button">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDeleteClick(user)} className="delete-button">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmation
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteConfirm}
        userName={deletingUser ? `${deletingUser.firstName} ${deletingUser.lastName}` : ''}
      />
    </div>
  );
};

export default UsersPage;