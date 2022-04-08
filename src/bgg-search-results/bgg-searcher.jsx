import React, { useEffect, useState } from "react";
import { FetchBggGamesPopularity } from "../bgg-fetcher/fetch-bgg-games-popularity";
import { FetchBggSearch } from "../bgg-fetcher/fetch-bgg-search";
import { BggSearchResult } from "./bgg-search-result";


export function BggSearcher() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [gamesPopularity, setGamesPopularity] = useState(new Map());
  const [isSorting, setSorting] = useState(false);
  
  const fetchQuery = () => {
    setSorting(false);
    FetchBggSearch(query, setSearchResults)
  };

  useEffect(() => {
    if (isSorting) return;
    if (searchResults.length === 0) return;

    FetchBggGamesPopularity(searchResults.map(result => result.id), setGamesPopularity);
  }, [searchResults]);

  useEffect(() => {
    if (gamesPopularity.size === 0) return;

    function popularitySort(a, b) {
      return gamesPopularity.get(a.id) <= gamesPopularity.get(b.id);
    }

    // have to make a new reference for searchResults
    setSearchResults([...searchResults.sort(popularitySort)]);
    setSorting(true);
  }, [gamesPopularity]);

  return (
    <div>
      <input type={'text'} value={query} onChange={event => setQuery(event.target.value)} onKeyUp={event => event.key === 'Enter' && fetchQuery()} />
      <button onClick={fetchQuery}>Search</button>
      {searchResults.map(result => <BggSearchResult {...result} key={result.id} />)}
    </div>
  );
}