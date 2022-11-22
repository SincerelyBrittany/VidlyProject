import React from "react";
import { getMovies } from "../services/fakeMovieService";

const Vidly = () => {
  const [movies, setMovies] = React.useState();

  React.useEffect(() => {
    const _getMovies = () => {
      const _movies = getMovies();
      setMovies(_movies || []);
    };
    _getMovies();
  }, []);

  const handleDeleteButton = (id) => {
    console.log("here", id);
  };
  return (
    <main className="container">
      <h1> Showing {movies && movies.length} movies in database.</h1>
      <table className="table table-light">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        {movies &&
          movies.map((movie) => (
            <tbody>
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button onClick={() => handleDeleteButton(movie._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </main>
  );
};

export default Vidly;
