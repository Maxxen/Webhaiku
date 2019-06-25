
import './App.css';

import { useStore, Action } from './Hooks/useStore';
import { VideoPlayer } from './Components/VideoPlayer';
import { Playlist } from './Components/Playlist';
import { SearchBar } from './Components/SearchBar';

const App: React.FC = () => {

  const [state, dispatch] = useStore()

  return (
    <div>
      <header>
        <h1>Web-Haiku</h1>
      </header>
      <main>
        {VideoPlayer(state.videos)}
        {SearchBar(dispatch)}
        {Playlist(state.videos)}
      </main>
    </div> 
  );
}


export default App;
