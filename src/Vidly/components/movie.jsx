import React from "react";
import Liked from "../common/like";

const Movie = (props) => {
  const { _id, title, numberInStock, dailyRentalRate, genre, liked } =
    props.movie;

  return (
    <React.Fragment>
      <tr>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <Liked liked={liked} onLiked={() => props.onLiked(props.movie)} />
        </td>
        <td>
          <button onClick={() => props.handleOnClick(props.movie)}>
            Delete
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Movie;
