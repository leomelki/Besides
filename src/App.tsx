import './App.css';
import Game from './game/Game';

import { LockstepWrapper } from 'netplayjs';
import MainMenu from './game/menus/MainMenu';

//@ts-ignore
if(!window.wrapper) {
  const wrapper = new LockstepWrapper(Game)
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
