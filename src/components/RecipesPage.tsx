import React, { useEffect, useState } from 'react'
import { Recipe } from '../types/types';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import UpdateRecipe from './UpdateRecipe';
// import CreateRecipe from './CreateRecipe';
// import DeleteRecipe from './DeleteRecipe';
import ExportRecipe from './ExportRecipe';

const RecipePage = () => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [recipeId, setRecipeId] = useState<string>('');

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipes', {
        headers: {
          "Authorization": Cookies.get('token')
        }
      });
      setRecipes(response.data.data);
    } catch (error) {
      console.error('Error fetching recipe data:', error);
    }
  };

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const handleCreateClick = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  const handleEditClick = (recipeId: string) => {
    setRecipeId(recipeId);
    setIsEditOpen(!isEditOpen);
  };

  const handleDeleteClick = (recipeId: string) => { 
    setRecipeId(recipeId);
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleSearchRecipes = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axios.get('http://localhost:8080/recipes', {
        headers: {
          "Authorization": Cookies.get('token')
        },
        params: {
          q: e.target.value
        }
      });

      setRecipes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="table-container">
      <button onClick={handleCreateClick}>Create</button>
      <ExportRecipe />
      <div className='search-modal'>
        <div className="input-container">
          <input type="text" placeholder="Search..." onChange={handleSearchRecipes} className="search-input" />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">Recipe Name</th>
            <th className="table-header-cell">Description</th>
            <th className="table-header-cell">Ingredients</th>
            <th className="table-header-cell">Instruction</th>
            <th className="table-header-cell">Image</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td className="table-cell">{recipe.name}</td>
              <td className="table-cell">{recipe.description}</td>
              <td className="table-cell">{recipe.ingredients.join(', ')}</td>
              <td className="table-cell">{recipe.instruction}</td>
              <td className="table-cell"><img src={`http://localhost:8080/${recipe.imgPath}`} style={{ width: 100 }} alt="Recipe" /></td>
              <td className="table-cell">
                <button onClick={() => handleEditClick(recipe._id)} className="action-button"><Edit size={16} /></button>
                <button onClick={() => handleDeleteClick(recipe._id)} className="delete-button"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {isEditOpen && <UpdateRecipe onSuccess={fetchRecipeData} recipeId={recipeId} onClose={() => handleEditClick(recipeId)} isOpen={isEditOpen} />}
      {isCreateOpen && <CreateRecipe onSuccess={fetchRecipeData} onClose={() => handleCreateClick()} isOpen={isCreateOpen} />}
      {isDeleteOpen && <DeleteRecipe onSuccess={fetchRecipeData} onClose={() => handleDeleteClick(recipeId)} recipeId={recipeId} />} */}
    </div>
  )
}

export default RecipePage;