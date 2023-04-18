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
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("Recipes").select();

      let recipeData = data;

      if (sortBy === "new-old") {
        recipeData = recipeData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (sortBy === "popularity") {
        recipeData = recipeData.sort((a, b) => b.upvotes - a.upvotes);
      }

      setRecipes(recipeData);
      setIsLoading(false);
    };
    fetchRecipes();
  }, [sortBy]);

  const onAddRecipeClick = () => {
    navigate(`/new`);
  };

  const handleSortByMostRecent = () => {
    setSortBy("new-old");
  };

  const handleSortByPopularity = () => {
    setSortBy("popularity");
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
      <div className="sort-content">
        <h4>Order by:</h4>
        <button
          className={`sort-btn ${sortBy === "new-old" ? "selected" : ""}`}
          onClick={handleSortByMostRecent}
        >
          Newest
        </button>
        <button
          className={`sort-btn ${sortBy === "popularity" ? "selected" : ""}`}
          onClick={handleSortByPopularity}
        >
          Most Popular
        </button>
      </div>
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
