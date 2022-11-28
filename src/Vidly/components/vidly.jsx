import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Movie from "./movie";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../../utils/paginate";

const Vidly = () => {
  const [isDataLoading, setDataLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState();
  const [pageSize, setPageSize] = React.useState(3);
  const [currentPage, setcurrentPage] = React.useState(1);

  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies((response && response) || []);
    setDataLoading(false);
  };
  React.useEffect(() => {
    setDataLoading(true);
    fetchMovies();
  }, []);

  const fetchGenres = async () => {
    const response = await getGenres();
    const genres = [{ name: "All Genres" }, ...response];
    setGenres(genres || []);
    setDataLoading(false);
  };
  React.useEffect(() => {
    setDataLoading(true);
    fetchGenres();
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

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setcurrentPage(1);
  };

  if (movies && movies.length === 0) return <p> There are no movies </p>;

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const paginatedMovies = paginate(filtered, currentPage, pageSize);

  return (
    <div>
      {isDataLoading ? (
        <h1> loading </h1>
      ) : (
        <div className="row">
          <div className="col-3">
            <ListGroup
              textProperty="name"
              valueProperty="_id"
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreSelect={handleGenreSelect}
            />
          </div>
          <div className="col">
            <h1> Showing {filtered.length} movies in database.</h1>
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
                {paginatedMovies.length !== 0 &&
                  paginatedMovies.map((movie) => (
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
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Vidly;
