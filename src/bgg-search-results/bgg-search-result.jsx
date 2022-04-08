import React from "react";
import styles from './styles.module.css';

export function BggSearchResult({ name, isPrimary, type, id, yearPublished }) {
  return (
    <div className={styles['search-result']}>
      <h3>{name}</h3>
      <p>Year Published: {yearPublished}</p>
    </div>
  )
}