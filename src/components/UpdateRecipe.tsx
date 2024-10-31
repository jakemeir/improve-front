import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

interface RecipeFormData {
  name: string;
  description: string;
  ingredients: string[];
  instruction: string;
}

interface UpdateRecipeProps {
  recipeId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateRecipe: React.FC<UpdateRecipeProps> = ({ recipeId, onClose, isOpen, onSuccess }) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    ingredients: [""],
    instruction: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/recipes/${recipeId}`, {
        headers: { "Authorization": Cookies.get('token') }
      });
      const { name, description, ingredients, instruction } = response.data.data;
      setFormData({ name, description, ingredients, instruction });
    } catch {
      setError('Recipe not found');
    }
  };

  useEffect(() => {
    if (isOpen) getRecipe();
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === "ingredients" && index !== undefined) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients[index] = value;
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    formData.ingredients.forEach((ingredient, index) => {
      formDataToSend.append(`ingredients[${index}]`, ingredient);
    });
    formDataToSend.append("instruction", formData.instruction);

    if (file) {
      formDataToSend.append("image", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/recipes/${recipeId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data", "Authorization": Cookies.get('token') } }
      );
      onSuccess();
      onClose();
      console.log(response.data);
    } catch (error: any) {
      setError(
        error.response.data.displayMessage || "An error occurred while updating the recipe."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Update Recipe</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input className="input" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>

          <label>
            Description:
            <input className="input" type="text" name="description" value={formData.description} onChange={handleInputChange} required />
          </label>

          <label>
            Ingredients:
            {formData.ingredients.map((ingredient, index) => (
              <input
                className="input"
                key={index}
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            ))}
          </label>

          <label>
            Instruction:
            <input className="input" type="text" name="instruction" value={formData.instruction} onChange={handleInputChange} required />
          </label>

          <label>
            Image:
            <input type="file" name="file" onChange={handleFileChange} />
          </label>

          <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Recipe"}</button>
          <button type="button" className="button cancelButton" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
