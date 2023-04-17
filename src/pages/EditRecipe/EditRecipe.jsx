import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import { difficulty, category } from "../../data/dropdownOptions";
import "./EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    difficulty: "none",
    category: "none",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase.from("Recipes").select().eq("id", id);
      setRecipeInfo((prev) => {
        return {
          ...prev,
          name: data[0].name,
          difficulty: data[0].difficulty,
          category: data[0].category,
          ingredients: data[0].ingredients,
          instructions: data[0].instructions,
          imageUrl: data[0].image_url,
        };
      });
    };
    fetchRecipes();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdate = async () => {
    navigate(`/`);
    await supabase
      .from("Recipes")
      .update({
        name: recipeInfo.name,
        difficulty: recipeInfo.difficulty,
        category: recipeInfo.category,
        ingredients: recipeInfo.ingredients,
        instructions: recipeInfo.instructions,
        image_url: recipeInfo.imageUrl,
      })
      .eq("id", id);
  };

  return (
    <div>
      <h2 className="page-title">Edit Recipe</h2>
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

          <input type="submit" value="Update" onClick={handleUpdate} />
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
