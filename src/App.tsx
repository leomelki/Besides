import './App.css';
import Game from './game/Game';

import { RollbackWrapper } from 'netplayjs';

new RollbackWrapper(Game).start();

function App() {

  return (
    <></>
  )
}

export default App
