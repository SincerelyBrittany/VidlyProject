import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColumnCopy = { ...this.props.sortColumn };
    if (sortColumnCopy.path === path)
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    this.props.onSort(sortColumnCopy);
  };

  render() {
    console.log(this.props, "this is props");
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
