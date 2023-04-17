import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import Card from "../../components/Card/Card";
import "./Home.css";

const Home = () => {
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase.from("Recipes").select();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const onAddRecipeClick = () => {
    navigate(`/new`);
  };

  return (
    <div className="content">
      {recipes && recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              upvotes={recipe.upvotes}
              createdAt={recipe.created_at}
            />
          ))}
        </ul>
      ) : (
        <div className="default-content">
          <h2>{`You haven't added a recipe yet 😞`}</h2>
          <input
            type="submit"
            value="Add one here 🧑‍🍳"
            onClick={onAddRecipeClick}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
