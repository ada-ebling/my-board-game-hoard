import React from "react";
import styles from './styles.module.css';

export function BggSearchResult({ result, addToGameTable, inGameTable }) {
  const { name, id, yearPublished } = result;
  return (
    <div className={styles['search-result']}>
      <h3>{name}</h3>
      <p>Year Published: {yearPublished}</p>
      {inGameTable(id) ?
        <button disabled>Game Already in Table</button> :
        <button onClick={(_event) => addToGameTable(result)}>Add to Table</button>}
    </div>
  )
}
