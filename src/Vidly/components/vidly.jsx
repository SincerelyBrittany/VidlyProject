import React from "react";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MovieTable from "./moviesTable";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { deleteMovie } from "../services/movieService";

const Vidly = (props) => {
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
  const [searchQuery, setSearchQuery] = React.useState("");

  const fetchMovies = async () => {
    const { data: movies } = await getMovies();
    setMovies(movies);
    setDataLoading(false);
  };
  React.useEffect(() => {
    setDataLoading(true);
    fetchMovies();
  }, []);

  const fetchGenres = async () => {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    setGenres(genres || []);
  };

  React.useEffect(() => {
    setDataLoading(true);
    fetchGenres();
  }, []);

  const handleDeleteButton = async (movie) => {
    const originalMovies = movies;
    const moviesCopy = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(moviesCopy);
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this movie has already been deleted");
        setMovies(originalMovies);
      }
    }
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setcurrentPage(1);
  };

  const handleSortButton = (sortColumnCopy) => {
    setSortColumn(sortColumnCopy);
  };

  if (movies && movies.length === 0) return <p> There are no movies </p>;

  const getPagedData = () => {
    let filtered;
    if (searchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedGenre && selectedGenre._id
          ? movies.filter((m) => m.genre._id === selectedGenre._id)
          : movies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedMovies = paginate(sorted, currentPage, pageSize);
    return {
      totalCount: filtered.length,
      paginatedMovies: paginatedMovies,
    };
  };

  const { totalCount, paginatedMovies } = getPagedData();

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
            {props.user && (
              <Link
                to="movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movies
              </Link>
            )}

            <h1> Showing {totalCount} movies in database.</h1>
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <MovieTable
              paginatedMovies={paginatedMovies}
              sortColumn={sortColumn}
              onhandleDeleteButton={handleDeleteButton}
              onhandleLikedButton={handleLikedButton}
              onSort={handleSortButton}
            />
            <Pagination
              itemsCount={totalCount}
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
