import React, { useState } from "react";
import { FetchBggCollection } from "../bgg-fetcher/fetch-bgg-collection";

export function BggCollectionFetcher() {
  const [username, setUsername] = useState('');
  const [collectionResults, setCollectionResults] = useState([]);
  const [status, setStatus] = useState('unstarted');
  
  const fetchCollection = () => {
    FetchBggCollection(username, setCollectionResults, setStatus)
  };

  return (
    <>
      <input type={'text'} value={username} onChange={event => setUsername(event.target.value)} onKeyUp={event => event.key === 'Enter' && fetchCollection()} />
      <button onClick={fetchCollection}>Search for Collection</button>
      <p>{status === 'completed' ? username : status}</p>
      {collectionResults.map(result => (
        <div key={result.id}>
          <img src={result.thumbnailUrl} alt={result.name} />
          <p>{`${result.name}`} | {result.yearPublished}</p>
        </div>
      ))}
    </>
  );
}