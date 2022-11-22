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
  return (
    <>
      <main className="container">
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
              movies.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Vidly;
