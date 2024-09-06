import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { PrimeReactProvider } from 'primereact/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './styles.css';

import App from './app/app';
import { RouterProvider } from 'react-router-dom';
import { routes } from './@routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={routes}/>
    </PrimeReactProvider>
  </StrictMode>
);
