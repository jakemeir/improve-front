import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ExerciseData {
  name: string;
  image: File | null;
}

export default function CreateExercise() {
  const [formData, setFormData] = useState<ExerciseData>({
    name: '',
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, image: e.target.files?e.target.files[0]:null }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use FormData to handle file upload
    const formToSubmit = new FormData();
    formToSubmit.append('name', formData.name);
    if (formData.image) {
      formToSubmit.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8080/exercises', formToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": Cookies.get('token')
        },
      });

      if (response.status === 200) {
        console.log('Exercise created successfully');
      } else {
        console.log('Failed to create exercise');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Exercise name"
        />
        <input
          name="image"
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}