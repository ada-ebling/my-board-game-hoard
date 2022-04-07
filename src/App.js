import './App.css';
import { BggCollectionFetcher } from './bgg-collection-results/bgg-collection-fetcher';
import { BggSearcher } from './bgg-search-results/bgg-searcher';

function App() {
  return (
    <div className="App">
      <BggCollectionFetcher />
      <BggSearcher />
    </div>
  );
}

export default App;
