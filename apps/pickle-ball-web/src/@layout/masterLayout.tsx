import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from './appHeader';
import { useEffect } from 'react';
import { Footer } from './appFooter';

export function MasterLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  );
}
