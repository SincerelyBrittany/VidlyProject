import React from "react";

export default function ListGroup(props) {
  const { genres, textProperty, valueProperty, onGenreSelect, selectedGenre } =
    props;
  return (
    <ul className="list-group">
      {genres.map((genre) => {
        return (
          <li
            onClick={() => onGenreSelect(genre)}
            key={genre[valueProperty]}
            className={
              genre === selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre[textProperty]}
          </li>
        );
      })}
    </ul>
  );
}

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};
