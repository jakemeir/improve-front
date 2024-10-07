import React, { useEffect, useState } from 'react';
import validator from 'validator';
import '../style/UpdateUser.css';

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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen) {
            setUser(initialUser);
            setIsDirty(false);
            setErrors({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }))
        setIsDirty(true);
    }

    const validateForm = () => {
        const { firstName, lastName, email, phone, password } = user;
        let newErrors: { [key: string]: string } = {};

        if (validator.isEmpty(firstName)) {
            newErrors.firstName = "First name cannot be empty.";
        }
        if (validator.isEmpty(lastName)) {
            newErrors.lastName = "Last name cannot be empty.";
        }
        if (!validator.isEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!validator.isMobilePhone(phone, 'he-IL')) {
            newErrors.phone = "Please enter a valid phone number.";
        }
        console.log(validator.isMobilePhone(phone, 'he-IL'))
        if (!validator.isLength(password, { min: 6 })) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            console.log('Updated user:', user); //Send an update request to the server
            setIsDirty(false);
            onClose();
        }else {
            console.log('Validation errors:', errors);
        }
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

                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input className="input" type="password" name='password' value={user.password} onChange={handleUpdate} placeholder="Password" />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

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