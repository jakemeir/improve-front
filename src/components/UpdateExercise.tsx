import React, { useState,useEffect } from "react";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';
import '../style/UpdateUser.css';

interface ExerciseFormData {
  name: string;
  description: string;
  sets: number;
  times: number;
  category: string;
  status: boolean;
}

interface UpdateExerciseProps {
  exerciseId: string;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateExercise: React.FC<UpdateExerciseProps> = ({ exerciseId,onClose,isOpen }) => {


  const [formData, setFormData] = useState<ExerciseFormData>({
    name: "",
    description: "",
    sets: 1,
    times: 1,
    category: "",
    status: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);




 const getExercise = async ()=>{
    try{
        const response = await axios.get(`http://localhost:8080/exercises/${exerciseId}`,{headers:{
            "Authorization":Cookies.get('token')
        },});
        console.log(response.data.data);
        
        setFormData({
            name: response.data.data.name || "",
            description: response.data.data.description || "",
            sets: response.data.data.sets || 1,
            times: response.data.data.times || 1,
            category: response.data.data.category || "",
            status: response.data.data.status || false
          });
    

    } catch (error) {
        setError('exercise not found')
    
    }
 
}  

useEffect(() => {
    if (isOpen) {
      getExercise();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('image/')) {
        setError("Only image files are allowed.");
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("sets", formData.sets.toString());
    formDataToSend.append("times", formData.times.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("status", formData.status.toString());

    if (file) {
      formDataToSend.append("image", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/exercises/${exerciseId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": Cookies.get('token')
          },
        }
      );
      onClose();
      console.log(response.data);
    } catch (error:any) {
      setError(
        error.response.data.displayMessage || "An error occurred while updating the exercise."
      );
    } finally {
      setLoading(false);
    }
  };




  return (

    <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>

      <h2>Update Exercise</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
           className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Description:
          <input
           className="input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Sets:
          <input
           className="input"
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Times:
          <input
           className="input"
            type="number"
            name="times"
            value={formData.times}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Category:
          <input
           className="input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
            Status:
            <input
            className="input"
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
          />
        </label>

        <label>
          Image:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Exercise"}
        </button>
        <button type="button" className="button cancelButton" onClick={onClose}>cancel</button>
      </form>
    </div>
    </div>
  );
};

export default UpdateExercise;