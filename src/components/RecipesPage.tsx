import React from 'react'
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import CreateRecipe from './CreatRecipe';


const RecipesPage = () => {
    const [isCreateRecipeOpen, setIsCreateRecipeOpen] = React.useState(false);

    const handleCreateRecipe = () => {
        setIsCreateRecipeOpen(true);
    };
    
  return (
    <div className="recipe-controls">
    <button className="add-button" onClick={handleCreateRecipe}>
        <PlusCircle size={20} className="add-button-icon" />
        Add New Recipe
    </button>
    <CreateRecipe isOpen={isCreateRecipeOpen} onClose={() => setIsCreateRecipeOpen(false)} />
</div>

  )
}

export default RecipesPage