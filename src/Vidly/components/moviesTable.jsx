import React, { Component } from "react";
import Movie from "./movie";
import Liked from "../common/like";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Range" },
    { key: "like", content: <Liked /> },
    { key: "delete" },
  ];

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const {
      sortColumn,
      paginatedMovies,
      onhandleLikedButton,
      onhandleDeleteButton,
      onSort,
    } = this.props;
    return (
      <table className="table table-light">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={paginatedMovies} columns={this.columns} />
        {/* {paginatedMovies.length !== 0 &&
          paginatedMovies.map((movie) => (
            <Movie
              key={movie._id}
              movie={movie}
              liked={movie.liked}
              onLiked={onhandleLikedButton}
              handleOnClick={onhandleDeleteButton}
            />
          ))} */}
      </table>
    );
  }
}

export default MoviesTable;
