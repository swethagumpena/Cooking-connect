import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import { difficulty, category } from "../../data/dropdownOptions";
import "./AddRecipe.css";

const AddRecipe = () => {
  let navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    difficulty: "none",
    category: "none",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addRecipe = async (event) => {
    event.preventDefault();
    await supabase
      .from("Recipes")
      .insert({
        name: recipeInfo.name,
        difficulty: recipeInfo.difficulty,
        category: recipeInfo.category,
        ingredients: recipeInfo.ingredients,
        instructions: recipeInfo.instructions,
        image_url: recipeInfo.imageUrl,
      })
      .select();
    setRecipeInfo({
      name: "",
      difficulty: "none",
      category: "none",
      ingredients: "",
      instructions: "",
      imageUrl: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h2 className="page-title">Add Recipe</h2>
      <div className="card-container">
        <form>
          <label htmlFor="recipe-name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipeInfo.name}
            onChange={handleChange}
          />
          <br />
          <br />

          <div className="horizontal-content">
            <div className="horizontal-content-child">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                rows="6"
                id="ingredients"
                name="ingredients"
                value={recipeInfo.ingredients}
                onChange={handleChange}
              />
            </div>

            <div className="horizontal-content-child">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                name="difficulty"
                value={recipeInfo.difficulty}
                onChange={handleChange}
              >
                <option>Select</option>
                {difficulty.map((d) => {
                  return (
                    <option value={d} key={d}>
                      {d}
                    </option>
                  );
                })}
              </select>
              <br />
              <br />

              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={recipeInfo.category}
                onChange={handleChange}
              >
                <option>Select</option>
                {category.map((c) => {
                  return (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
              <br />
              <br />
            </div>
          </div>

          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows="6"
            value={recipeInfo.instructions}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="image-url">Image URL (Optional)</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipeInfo.imageUrl}
            onChange={handleChange}
          />

          <input type="submit" value="Add" onClick={addRecipe} />
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
