import React, { useEffect, useState } from 'react';
import '../style/UpdateUser.css'  

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialUser: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        role: string;
    };
}

const UpdateUser: React.FC<Props> = ({ isOpen, onClose, initialUser }) => {

    const [user, setUser] = useState(initialUser);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setUser(initialUser);
            setIsDirty(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }))
        setIsDirty(true);
    }

    const handleSave = () => {
        console.log('Updated user:', user); //Send an update request to the server
        setIsDirty(false);
        onClose();
    }

    const handleCancel = () => {
        setUser(initialUser);
        setIsDirty(false);
        onClose();
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Update Username</h2>
                <input className="input" type="text" name='firstName'  value={user.firstName} onChange={handleUpdate} />
                <input className="input" type="text" name='lastName' value={user.lastName} onChange={handleUpdate} />
                <input className="input" type="email" name='email' value={user.email} onChange={handleUpdate} />
                <input className="input" type="tel" name='phone' value={user.phone} onChange={handleUpdate} />
                <input className="input" type="text" name='password' value={user.password} onChange={handleUpdate} />
                <input className="input" type="text" name='role' value={user.role} onChange={handleUpdate} />
                <div>
                    <button className={`button saveButton ${!isDirty ? 'disabled' : ''}`} onClick={handleSave} disabled={!isDirty}>save</button>
                    <button className="button" onClick={handleCancel}>cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;