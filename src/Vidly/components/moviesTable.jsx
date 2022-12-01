import React, { Component } from "react";
import Movie from "./movie";
import Liked from "../common/like";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import Table from "../common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Range" },
    {
      key: "like",
      content: (movie) => (
        <Liked
          liked={movie.liked}
          currentPage={this.props.currentPage}
          onLiked={() => this.props.onhandleLikedButton(movie)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button onClick={() => this.props.onhandleDeleteButton(movie)}>
          Delete
        </button>
      ),
    },
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
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={paginatedMovies}
      />
      //   <table className="table table-light">
      //     <TableHeader
      //       columns={this.columns}
      //       sortColumn={sortColumn}
      //       onSort={onSort}
      //     />
      //     <TableBody data={paginatedMovies} columns={this.columns} />
      //     {/* {paginatedMovies.length !== 0 &&
      //       paginatedMovies.map((movie) => (
      //         <Movie
      //           key={movie._id}
      //           movie={movie}
      //           liked={movie.liked}
      //           onLiked={onhandleLikedButton}
      //           handleOnClick={onhandleDeleteButton}
      //         />
      //       ))} */}
      //   </table>
    );
  }
}

export default MoviesTable;
