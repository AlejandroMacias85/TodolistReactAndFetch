import React from 'react'


export default function Input(props) {
  return (
    <li className="list-group-item d-flex justify-content-between border border-success">
    {props.tarea}
    <span
      type="button"
      onClick={() => {
        props.onDelete(props.id);
      }}
      className="delete-button"
    >
      <i className="fas fa-times"></i>
    </span>
  </li>
  )
}
