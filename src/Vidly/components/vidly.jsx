import React from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Movie from "./movie";
import Like from "../common/like";

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

  const handleLikedButton = (movie) => {
    const moviesCopy = [...movies];
    const index = moviesCopy.indexOf(movie);
    moviesCopy[index] = { ...moviesCopy[index] };
    moviesCopy[index].liked = !moviesCopy[index].liked;
    setMovies(moviesCopy);
  };

  if (movies && movies.length === 0) return <p> There are no movies </p>;

  return (
    <div>
      <h1> Showing {movies && movies.length} movies in database.</h1>
      <table className="table table-light">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col">Like</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                liked={movie.liked}
                onLiked={handleLikedButton}
                handleOnClick={handleDeleteButton}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vidly;
