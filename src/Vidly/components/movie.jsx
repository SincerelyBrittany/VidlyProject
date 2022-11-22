import React from "react";

const Movie = (props) => {
  const { title, numberInStock, dailyRentalRate, genre } = props.movie;
  console.log(props);
  return (
    <>
      <td>{title}</td>
      <td>{genre.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td>
        <button onClick={() => props.handleOnClick(props.movie._id)}>
          Delete
        </button>
      </td>
    </>
  );
};

export default Movie;
