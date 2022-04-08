import React from "react";
import styles from './styles.module.css';

export function GameTable({ gameTable, setGameTable }) {
  return (
    <table className={styles['game-table']}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Game</th>
          <th>Year Published</th>
        </tr>
      </thead>
      <tbody>
        {gameTable.map(game =>
          <tr key={game.id}>
            <td>{game.id}</td>
            <td>{game.name}</td>
            <td>{game.yearPublished}</td>
          </tr>
        )}
      </tbody>
    </table>

  )
}