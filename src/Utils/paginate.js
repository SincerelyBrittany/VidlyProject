import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = pageNumber - 1 * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
  // _.slice(items, startIndex)
  // _.take()
}

// It basically reads "For the given items, extract pageSize number of elements starting from startIndex"

// .slice with one argument returns an array from the given index to the end.
// .take extracts the given number of elements from the array.
// .value() returns the output of applying preceding operation.
