import { useEffect, useState } from 'react';
import './App.css';
import { FetchBggGames } from './bgg-fetcher/fetch-bgg-games';
import { BggSearcher } from './bgg-search-results/bgg-searcher';
import { GameTable } from './game-table/game-table';

function App() {
  const [games, setGames] = useState([]);
  const [fetchedGame, setFetchedGame] = useState([]);

  useEffect(() => {
    if (fetchedGame.length === 0) return;
    const game = fetchedGame[0];
    setGames([...games, game]);
    setFetchedGame([]);
  }, [fetchedGame, games]);

  function addToGameTable(newGame) {
    FetchBggGames([newGame.id], setFetchedGame);
  }

  function inGameTable(id) {
    return !!games.find(tableGame => tableGame.id === id);
  }

  return (
    <div className="App">
      {games.length === 0 ? <></> : <GameTable gameTable={games} setGameTable={setGames} />}
      <BggSearcher addToGameTable={addToGameTable} inGameTable={inGameTable} />
    </div>
  );
}

export default App;
