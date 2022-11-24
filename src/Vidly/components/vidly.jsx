import React from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "../common/pagination";
import { paginate } from "../../Utils/paginate";

const Vidly = () => {
  const [movies, setMovies] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(4);
  const [currentPage, setcurrentPage] = React.useState(0);

  React.useEffect(() => {
    const _getMovies = async () => {
      const _movies = await getMovies();
      setMovies(_movies);
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

  const handlePageChange = (pageNum) => {
    setcurrentPage(pageNum);
  };

  if (movies && movies.length === 0) return <p> There are no movies </p>;

  const paginatedMovies = paginate(movies, currentPage, pageSize);
  console.log(movies.length, "this is length");
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
          {paginatedMovies.map((movie) => (
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
      <Pagination
        itemsCount={movies.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Vidly;
