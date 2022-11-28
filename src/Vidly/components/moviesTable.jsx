import React from "react";
import Movie from "./movie";

const MovieTable = (props) => {
  const { paginatedMovies, onhandleLikedButton, onhandleDeleteButton, onSort } =
    props;
  return (
    <table className="table table-light">
      <thead>
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => onSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => onSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => onSort("dailyrentalrate")} scope="col">
            Rate
          </th>
          <th onClick={() => onSort()} scope="col">
            Like
          </th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {paginatedMovies.length !== 0 &&
          paginatedMovies.map((movie) => (
            <Movie
              key={movie._id}
              movie={movie}
              liked={movie.liked}
              onLiked={onhandleLikedButton}
              handleOnClick={onhandleDeleteButton}
            />
          ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
