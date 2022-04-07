import React, { useState } from "react";
import { FetchBggSearch } from "../bgg-fetcher/fetch-bgg-search";
import { BggSearchResult } from "./bgg-search-result";


export function BggSearcher() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const fetchQuery = () => {
    FetchBggSearch(query, setSearchResults)
  };

  return (
    <>
      <input type={'text'} value={query} onChange={event => setQuery(event.target.value)} />
      <button onClick={fetchQuery}>Search</button>
      {searchResults.map(result => <BggSearchResult {...result} key={result.id} />)}
    </>
  );
}