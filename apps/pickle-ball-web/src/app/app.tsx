// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppIcon } from '../@components/_icons/app_logo';
import { ChatIcon, DashboardIcon, GroupsIcon, SettingIcon, TournamentIcon } from '../@components/_icons/menu_icons';
import { Landing } from '../@landing';
import { AppHeader } from '../@layout/appHeader';
import { Groups } from '../@pages/groups';
import './app.module.css';

export function App() {
  return (
    <>
      <AppHeader />
      <Landing/>
    </>
  );
}

export default App;
