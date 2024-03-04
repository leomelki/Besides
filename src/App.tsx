import './App.css';
import Game from './game/Game';

import { RollbackWrapper } from 'netplayjs';
import MainMenu from './game/menus/MainMenu';

//@ts-ignore
if(!window.wrapper) {
  const wrapper = new RollbackWrapper(Game)
  //@ts-ignore
  window.wrapper = wrapper;
  wrapper.start();
  wrapper.stats.remove();
}


function App() {

  return (
    <MainMenu />
  )
}

export default App
