import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

const Vidly = () => {
  const [isDataLoading, setDataLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [sortColumn, setSortColumn] = React.useState({
    path: "title",
    order: "asc",
  });
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
    const genres = [{ _id: "", name: "All Genres" }, ...response];
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

  const handleSortButton = (sortColumnCopy) => {
    setSortColumn(sortColumnCopy);
  };

  if (movies && movies.length === 0) return <p> There are no movies </p>;

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedMovies = paginate(sorted, currentPage, pageSize);

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
            <MovieTable
              paginatedMovies={paginatedMovies}
              sortColumn={sortColumn}
              onhandleDeleteButton={handleDeleteButton}
              onhandleLikedButton={handleLikedButton}
              onSort={handleSortButton}
            />
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
