import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import '../style/CreateRecipe.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: ()=>void;
}
const CreateRecipe: React.FC<Props> = ({ isOpen, onClose, onSuccess}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instruction, setInstruction] = useState('');
    const [imgPath, setImgPath] = useState<File | null>(null);
    const [errors, setErrors] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImgPath(event.target.files[0]);
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors("");
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}]`, ingredient);
        });
        formData.append('instruction', instruction);
        formData.append('type', 'recipe');
        if (imgPath) {
            formData.append('image', imgPath);
        };

        try {
            const response = await axios.post('http://localhost:8080/recipes', formData, {
                headers: {
                    "Authorization": Cookies.get('token'),
                    'Content-Type': 'multipart/form-data',
                }
            });

            setName('');
            setDescription('');
            setIngredients([]);
            setInstruction('');
            setImgPath(null);
            setErrors('');
            onClose();
            onSuccess();
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
        <div className="overlay" onClick={onClose}>
            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                <h2>Add Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Recipe Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Recipe Name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short Description"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="ingredients">Ingredients</label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    placeholder="Enter Ingredient"
                                />
                                <button type="button" onClick={() => removeIngredient(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" className="add-ingredient-button" onClick={addIngredient}>Add Ingredient</button>
                    </div>
                    <div>
                        <label htmlFor="instruction">Instructions</label>
                        <textarea
                            id="instruction"
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                            placeholder="Enter Instructions"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Recipe'}
                    </button>
                    {errors && <p className="error-message">{errors}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;
