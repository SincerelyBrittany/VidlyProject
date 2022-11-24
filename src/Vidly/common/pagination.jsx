import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const anchorStyle = { cursor: "pointer", boxShadow: "none" };

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((page) => {
          return (
            <li
              key={page}
              className={
                page !== currentPage ? "page-item" : "page-item active"
              }
            >
              <a
                className="page-link"
                style={anchorStyle}
                href="/#"
                onClick={(event) => {
                  onPageChange(page);
                  event.preventDefault();
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
