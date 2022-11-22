import React from "react";

const Movie = (props) => {
  const { _id, title, numberInStock, dailyRentalRate, genre } = props.movie;

  return (
    <React.Fragment>
      <tr>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
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
