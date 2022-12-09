import React, { Component } from "react";
import Liked from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";
import authService from "../services/authService";

class MoviesTable extends Component {
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button onClick={() => this.props.onhandleDeleteButton(movie)}>
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
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
    );
  }
}

export default MoviesTable;
