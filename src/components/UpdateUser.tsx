// General: The component creates a popup window for user update
//
// Input: The component receives the ID of the user
//
// Process: The component imports the user's information and allows them to be edited
//
// Output: The component sends the updated details to the server
//--------------------------------------------------------------------------------------- 
// Programer: yaaqov burshtein.
// Date: 7/10/2024.
//---------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import validator from 'validator';
import '../style/UpdateUser.css';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

const UpdateUser: React.FC<Props> = ({ isOpen, onClose, userId }) => {

    // Fetch user data from API
    const fetchUserData = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/users/${userId}`);
            setUser(response.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // User details
    const [user, setUser] = useState<any>(null);
    // Checks if a change has been made (dirt)
    const [isDirty, setIsDirty] = useState(false);
    // Error messages for each field
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen) {
            fetchUserData();
            setIsDirty(false);
            setErrors({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    if (!user) {
        return <div>not found</div>;
    }

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser: any) => ({ ...prevUser, [name]: value }))
        setIsDirty(true);
    }

    const validateForm = () => {
        const {
            firstName: rawFirstName,
            lastName: rawLastName,
            email: rawEmail,
            phone: rawPhone
        } = user;

        const firstName = rawFirstName.trim();
        const lastName = rawLastName.trim();
        const email = rawEmail.trim();
        const phone = rawPhone.trim();

        let newErrors: { [key: string]: string } = {};

        if (validator.isEmpty(firstName)) {
            newErrors.firstName = "First name cannot be empty.";
        } else if (!validator.isAlpha(firstName, 'en-US')) {
            newErrors.firstName = "First name must contain only letters.";
        }

        if (validator.isEmpty(lastName)) {
            newErrors.lastName = "Last name cannot be empty.";
        } else if (!validator.isAlpha(lastName, 'en-US')) {
            newErrors.lastName = "Last name must contain only letters.";
        }

        if (!validator.isEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!validator.isMobilePhone(phone, 'he-IL')) {
            newErrors.phone = "Please enter a valid phone number.";
        }
        // console.log(validator.isMobilePhone(phone, 'he-IL'))
        // if (!validator.isLength(password, { min: 6 })) {
        //     newErrors.password = "Password must be at least 6 characters.";
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Sending an update request to the server
    const handleSave = async () => {
        const { firstName, lastName, phone, email, role } = user;
        const updatedUser = { firstName, lastName, phone, email, role };
        if (validateForm()) {
            try {
                await axios.put(`http://localhost:8080/users/${userId}`, updatedUser, {
                    headers: {
                        "Authorization": Cookies.get('token')
                    }
                });
                console.log('Updated user:', updatedUser);
                setIsDirty(false);
                onClose();
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Error details:', error.response.data);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        } else {
            console.log('Validation errors:', errors);
        }
    }

    const handleCancel = () => {
        setUser(null);
        setIsDirty(false);
        onClose();
    };

    return (
        <div className="overlay" onClick={handleCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Update Username</h2>
                <div className="form-group">
                    <label htmlFor='firstName'>First Name</label>
                    <input className="input" type="text" name='firstName' value={user.firstName} onChange={handleUpdate} placeholder="First Name" />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='lastName'>Last Name</label>
                    <input className="input" type="text" name='lastName' value={user.lastName} onChange={handleUpdate} placeholder="Last Name" />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input className="input" type="email" name='email' value={user.email} onChange={handleUpdate} placeholder="Email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='phone'>Phone</label>
                    <input className="input" type="tel" name='phone' value={user.phone} onChange={handleUpdate} placeholder="Phone" />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                {/* <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input className="input" type="password" name='password' value={user.password} onChange={handleUpdate} placeholder="Password" />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div> */}

                <div className="form-group">
                    <label htmlFor='role'>Role</label>
                    <input className="input" type="text" name='role' value={user.role} onChange={handleUpdate} placeholder="Role" />
                </div>
                <div>
                    <button className={`button saveButton ${!isDirty ? 'disabled' : ''}`} onClick={handleSave} disabled={!isDirty}>save</button>
                    <button className="button cancelButton" onClick={handleCancel}>cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;