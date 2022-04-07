import React from "react";

export function BggSearchResult({ name, isPrimary, type, id, yearPublished }) {
  return (
    <div key={id}>
      <h3>{name}</h3>
      <p>Year Published: {yearPublished}</p>
    </div>
  )
}