import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import Card from "../../components/Card/Card";
import loadingSvg from "../../assets/loading.svg";
import "./Home.css";

const Home = () => {
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("Recipes").select();
      setRecipes(data);
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  const onAddRecipeClick = () => {
    navigate(`/new`);
  };

  if (isLoading) {
    return (
      <div className="default-content">
        <img src={loadingSvg} alt="Loading" />
      </div>
    );
  }

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
