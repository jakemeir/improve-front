import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import UpdateUser from './UpdateUser';
import CreateUser from './CreateUser';
import {User} from '../types/types';
import DeleteConfirmation from './DeleteConfirmation';
import '../style/UsersPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import ExportUserButton from './ExportUserButton';


const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [isModelOpen, setModelOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users',{
                    headers:{
                        "Authorization":Cookies.get('token')
                    }
                });
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };

        fetchUsersData();
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const isLoggedIn = false;    
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, [navigate]);

    // לוגיקה להוספת, עריכה ומחיקת משתמשים
    const handleCreateUser = () => {
        setIsCreateUserOpen(true);
    };

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
    const handleSearchUsers= async (e:React.ChangeEvent<HTMLInputElement>) =>{

        try {
          const response = await axios.get('http://localhost:8080/users',{
            headers:{
                "Authorization":Cookies.get('token')
            },
            params:{
                q:e.target.value
            }
      
        });
      
        setUsers(response.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      
      
      
      }

    return (
        <div className="users-container">
            <div className="user-controls">
                <button className="add-button" onClick={handleCreateUser}>
                    <PlusCircle size={20} className="add-button-icon" />
                    Add New User
                </button>
                <ExportUserButton />
                <CreateUser isOpen={isCreateUserOpen} onClose={() => setIsCreateUserOpen(false)} additionalData='' />
                <div className='search-modal'>
                    <div className="input-container">
                        <input type="text" placeholder="Search..." onChange={handleSearchUsers} className="search-input"/>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-header-cell">First Name</th>
                            <th className="table-header-cell">Last Name</th>
                            <th className="table-header-cell">Email</th>
                            <th className="table-header-cell">Phone Number</th>
                            <th className="table-header-cell">Role</th>
                           <th className="table-header-cell">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="table-cell">{user.firstName}</td>
                                <td className="table-cell">{user.lastName}</td>
                                <td className="table-cell">{user.email}</td>
                                <td className="table-cell">{user.phone}</td>
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
                userId={deletingUser ? `${deletingUser._id}` : ''}
            />
        </div>
    );
};

export default UsersPage;
