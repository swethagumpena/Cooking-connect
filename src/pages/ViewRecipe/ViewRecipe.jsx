import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import "./ViewRecipe.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { formatDateTime } from "../../utils/dateTime";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import loadingSvg from "../../assets/loading.svg";

const ViewRecipe = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    difficulty: "none",
    category: "none",
    ingredients: "",
    instructions: "",
    image_url: "",
    upvotes: 0,
  });
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("Recipes").select().eq("id", id);
      setRecipeInfo(data[0]);
      setIsLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="default-content">
        <img src={loadingSvg} alt="Loading" />
      </div>
    );
  }

  const onHomeClick = () => {
    navigate(`/`);
  };

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    const newUpvoteCount = isLiked
      ? recipeInfo.upvotes - 1
      : recipeInfo.upvotes + 1;
    setRecipeInfo((prev) => {
      return {
        ...prev,
        upvotes: newUpvoteCount,
      };
    });
    await supabase
      .from("Recipes")
      .update({
        upvotes: newUpvoteCount,
      })
      .eq("id", id);
  };

  const onEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const onDeleteClick = async () => {
    await supabase.from("Recipes").delete().eq("id", id);
    navigate("/");
  };

  const checkImage = (url) => {
    const img = new Image();
    img.onload = () => setIsUrlValid(true);
    img.onerror = () => setIsUrlValid(false);
    img.src = url;
  };

  checkImage(recipeInfo.image_url);

  return (
    <div className="view-content">
      {recipeInfo ? (
        <>
          <p className="card-content">
            {formatDateTime(recipeInfo.created_at)}
          </p>
          <p className="view-title">{recipeInfo.name}</p>

          <div className="sub-content">
            <p className="card-content">
              <b>Category: </b>
              {recipeInfo.category}
            </p>
            <p className="card-content">
              <b>Difficulty: </b>
              {recipeInfo.difficulty}
            </p>
          </div>
          {isUrlValid && (
            <img
              src={recipeInfo.image_url}
              alt="recipe-image"
              className="dish-image"
            />
          )}
          <div className="sub-content">
            <div className="sub-content">
              <a
                role="button"
                aria-label="Search"
                className="icons"
                onClick={handleLikeClick}
              >
                {isLiked ? (
                  <BsHandThumbsUpFill size={25} />
                ) : (
                  <BsHandThumbsUp size={25} />
                )}
              </a>
              <p className="card-content">{recipeInfo.upvotes} upvotes</p>
            </div>
            <div>
              <AiFillEdit
                className="icons icon-highlighting"
                size={25}
                onClick={() => onEditClick(recipeInfo.id)}
              />
              <AiTwotoneDelete
                className="icons icon-highlighting"
                size={25}
                onClick={onDeleteClick}
              />
            </div>
          </div>
          <div></div>
        </>
      ) : (
        <div className="default-content">
          <h2>{`No content 😞`}</h2>
          <input type="submit" value="Home 🏠" onClick={onHomeClick} />
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
