import React from "react";
import { getMovies } from "../services/fakeMovieService";
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

  const handleDeleteButton = (id) => {
    console.log("here", id);
    var array = [...movies]; // make a separate copy of the array
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ movies: array });
    }
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
              <tr>
                <Movie
                  key={movie._id}
                  movie={movie}
                  handleOnClick={handleDeleteButton}
                />
              </tr>
            </tbody>
          ))}
      </table>
    </main>
  );
};

export default Vidly;
