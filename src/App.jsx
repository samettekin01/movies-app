import './App.css';
import MovieCard from './components/movieCard/movieCard';
import { MoviesProvider } from './components/providers/moviesProvider';

function App() {
  
  return (
    <div className="App">
      <MoviesProvider>
        <MovieCard />
      </MoviesProvider>
    </div>
  );
}

export default App;
