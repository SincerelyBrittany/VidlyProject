import React from "react";

const Input = (props) => {
  const { name, label, value, onChange } = props;
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          autoFocus
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          className="form-control"
        />
      </div>
    </>
  );
};

export default Input;
