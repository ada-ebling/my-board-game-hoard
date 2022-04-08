import React from "react";
import styles from './styles.module.css';

export function BggSearchResult({ name, isPrimary, type, id, yearPublished, addToGameTable }) {
  return (
    <div className={styles['search-result']}>
      <h3>{name}</h3>
      <p>Year Published: {yearPublished}</p>
      <button onClick={(_event) => addToGameTable({ name, id, yearPublished })}>Add to Table</button>
    </div>
  )
}
