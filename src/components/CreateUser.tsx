import React, { useState } from 'react';
import './CreateUser.css';

const RegisterUser: React.FC = () => {
  // Define state for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // State to store error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State to check if form is submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex pattern for email validation
    return emailRegex.test(email);
  };

  // Define the submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset any previous errors
    setErrors({});

    // Validate email
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      return; // Stop form submission if email is invalid
    }

    // Set the form as submitting
    setIsSubmitting(true);

    // Prepare data to send
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    try {
      // Simulate a request to the server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // If successful, clear the form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setErrors({});  // Clear any previous errors
      } else {
        // If there are errors, update the errors state
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      setErrors({ global: 'Something went wrong. Please try again.' });
    } finally {
      // Re-enable the submit button
      setIsSubmitting(false);
    }
  };

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
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
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
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className={errors.email ? 'input-error' : ''}  // Conditionally add error class
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
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
          {errors.phone && <p className="error-message">{errors.phone}</p>}
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
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
        {errors.global && <p className="error-message">{errors.global}</p>}
      </form>
    </div>
  );
};

export default RegisterUser;
