import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/dateTime";

const Card = (props) => {
  let navigate = useNavigate();

  const handleOnCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="Card" onClick={() => handleOnCardClick(props.id)}>
      <p className="card-content">{formatDateTime(props.createdAt)}</p>
      <h2 className="card-title">{props.name}</h2>
      <p className="card-content">{props.upvotes} upvotes</p>
    </div>
  );
};

export default Card;
