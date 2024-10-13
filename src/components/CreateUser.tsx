import React, { useState } from 'react';
import axios from 'axios';
import '../style/CreateUser.css';

const CreateUser: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const [errors, setErrors] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors("");
    setIsSubmitting(true);
  
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/users', formData);
  
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setErrors('');
    } catch (error: any) {
      if (error.response) {
        console.error('Failed to submit form:', error.response.data);
        setErrors(error.response.data.displayMessage || "An error occurred during form submission.");
      } else {
        console.error('Error:', error.message);
        setErrors("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your Phone"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
        {errors && <p className="error-message">{errors}</p>}
      </form>
    </div>
  );
};

export default CreateUser;
