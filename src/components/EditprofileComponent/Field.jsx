import React from "react";

export default function Field({
  children,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="input">
      <label htmlFor={name} className="Label">
        {children}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="editInput"
        {...(type !== "file" ? { value } : {})} // avoid setting value for file inputs
      />
    </div>
  );
}
