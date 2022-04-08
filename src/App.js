import { useState } from 'react';
import './App.css';
import { BggSearcher } from './bgg-search-results/bgg-searcher';
import { GameTable } from './game-table/game-table';

function App() {
  const [games, setGames] = useState([]);

  function addToGameTable(newGame) {
    setGames([...games, newGame])
  }

  return (
    <div className="App">
      {games.length === 0 ? <></> : <GameTable gameTable={games} setGameTable={setGames} />}
      <BggSearcher addToGameTable={addToGameTable}/>
    </div>
  );
}

export default App;
