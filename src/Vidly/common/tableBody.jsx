import React from "react";
import Liked from "../common/like";
import _ from "lodash";

const TableBody = (props) => {
  const { data, columns } = props;

  return (
    <tbody>
      {data.map((item) => (
        <tr>
          {columns.map((column) => (
            <td> {_.get(item, column.path)} </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
