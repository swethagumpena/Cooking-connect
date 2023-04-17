import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import "./ViewRecipe.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { formatDateTime } from "../../utils/dateTime";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

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

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data } = await supabase.from("Recipes").select().eq("id", id);
      setRecipeInfo(data[0]);
      // checkImage(data[0].image_url);
    };
    fetchRecipe();
  }, [id]);

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
    console.log();
    await supabase.from("Recipes").delete().eq("id", id);
    navigate("/");
  };

  const imgExists = (url) => {
    console.log(url);
    const img = new Image();
    img.src = url;
    return img.complete || img.width + img.height > 0;
  };

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
          {imgExists(recipeInfo.image_url) && (
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
