import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import UpdateUser from './UpdateUser';
import User from '../types/types';
import DeleteConfirmation from './DeleteConfirmation';
import '../style/UsersPage.css';
import axios from 'axios';
import SearchBox from './SearchBox';

const UsersPage: React.FC = () => {

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsersData();
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //props for update user
  const [isModelOpen, setModelOpen] = useState(false);

  const handleEditClick = (userId: string) => {
    setEditingUserId(userId);
    setModelOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
  };

  const handleDeleteConfirm = () => {
    if (deletingUser) {
      setUsers(users.filter(user => user._id !== deletingUser._id));
      setDeletingUser(null);
    }
  };

  return (
    <div className="users-container">
      <h2 className="page-title">Users</h2>
      <SearchBox />
      <button className="add-button">
        <PlusCircle size={20} className="add-button-icon" />
        Add New User
      </button>
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
              <tr key={user._id}>
                <td className="table-cell">{user.firstName}</td>
                <td className="table-cell">{user.lastName}</td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.phone}</td>
                <td className="table-cell">{user.password}</td>
                <td className="table-cell">{user.role}</td>
                <td className="table-cell">
                  <button onClick={() => handleEditClick(user._id)} className="action-button">
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

      <UpdateUser isOpen={isModelOpen} onClose={() => setModelOpen(false)} userId={editingUserId || ""} />

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