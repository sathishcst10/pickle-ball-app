// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppIcon } from '../@components/_icons/app_logo';
import { ChatIcon, DashboardIcon, GroupsIcon, SettingIcon, TournamentIcon } from '../@components/_icons/menu_icons';
import { Groups } from '../@pages/groups';
import './app.module.css';

export function App() {
  return (
    <main className="d-flex flex-nowrap">
      <div
        className="d-flex flex-column flex-shrink-0 bg-body-tertiary border-end"
        style={{ width: '4.5rem' }}
      >
        <a
          href="/"
          className="d-block p-3 link-body-emphasis text-decoration-none text-center"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
        >
          {/* <img
            src="smash.png"
            alt="app-logo"
            style={{ width: '42px', height: '42px' }}
          /> */}
          <AppIcon />
          <span className="visually-hidden">Icon-only</span>
        </a>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item px-3 py-2">
            <a
              href="#"
              className="nav-link active p-2 rounded-3"
              aria-current="page"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Dashboard"
              data-bs-original-title="Dashboard"
            >
              <DashboardIcon/>
            </a>
          </li>
          <li className='nav-item px-3 py-2'>
            <a
              href="#"
              className="nav-link p-2 rounded-0"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Groups"
              data-bs-original-title="Groups"
            >
              <GroupsIcon/>
            </a>
          </li>
          <li className='nav-item px-3 py-2'>
            <a
              href="#"
              className="nav-link p-2 rounded-0"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Tournments"
              data-bs-original-title="Tournments"
            >
              <TournamentIcon/>
            </a>
          </li>
          <li className='nav-item px-3 py-2'>
            <a
              href="#"
              className="nav-link p-2 rounded-0"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Chat"
              data-bs-original-title="Chat"
            >
              <ChatIcon/>
            </a>
          </li>
          <li className='nav-item px-3 py-2'>
            <a
              href="#"
              className="nav-link p-2 rounded-0"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Setting"
              data-bs-original-title="Setting"
            >
              <SettingIcon/>
            </a>
          </li>
        </ul>
        <div className="dropdown border-top">
          <a
            href="#"
            className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="24"
              height="24"
              className="rounded-circle"
            />
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Groups/>
    </main>
  );
}

export default App;
