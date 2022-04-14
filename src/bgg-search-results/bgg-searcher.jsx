import React, { useEffect, useState } from "react";
import { FetchBggGames } from "../bgg-fetcher/fetch-bgg-games";
import { FetchBggSearch } from "../bgg-fetcher/fetch-bgg-search";
import { BggSearchResult } from "./bgg-search-result";
import styles from './styles.module.css'


export function BggSearcher({ addToGameTable, inGameTable }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [queryState, setQueryState] = useState('ready');
  const [displayedGames, _setDisplayedGames] = useState([]);

  function setDisplayedGames(rawGames) {
    _setDisplayedGames(rawGames.sort((a, b) => b.popularity - a.popularity));
  }

  const fetchSearchQuery = () => {
    setSearchResults([]);
    setQueryState('searching');
    FetchBggSearch(query, setSearchResults).then(() => setQueryState('searchComplete'))
  };

  useEffect(() => {
    if (queryState === 'searchComplete') {
      setQueryState('fetching');
      FetchBggGames(searchResults.map(result => result.id), setDisplayedGames).then(() => setQueryState('retrieved'));
    }
  }, [searchResults, queryState, setQueryState])

  return (
    <div className={styles['searcher']}>
      <input type={'text'} value={query} onChange={event => setQuery(event.target.value)} onKeyUp={event => event.key === 'Enter' && fetchSearchQuery()} />
      <button onClick={fetchSearchQuery}>Search</button>
      {displayedGames.map(result => <BggSearchResult
        result={result}
        key={result.id}
        addToGameTable={addToGameTable}
        inGameTable={inGameTable}
      />)}
    </div>
  );
}