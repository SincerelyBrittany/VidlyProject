import React from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Movie from "./movie";

const Vidly = () => {
  const [movies, setMovies] = React.useState();

  React.useEffect(() => {
    const _getMovies = async () => {
      const _movies = await getMovies();
      setMovies(_movies || []);
    };
    _getMovies();
  }, []);

  const handleDeleteButton = (movie) => {
    const moviesCopy = movies.filter((m) => m._id !== movie._id);
    setMovies(moviesCopy);
  };

  if (movies && movies.length === 0) return <p> There are no movies </p>;

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
        <tbody>
          {movies &&
            movies.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                handleOnClick={handleDeleteButton}
              />
            ))}
        </tbody>
      </table>
    </main>
  );
};

export default Vidly;
