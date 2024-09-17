import { Navigate, Outlet } from 'react-router-dom';
import { DashboardHeader } from './dashboardHeader';
import { useEffect } from 'react';

export const DashboardLayout = ({ children }: any) => {
useEffect   (() => {
    document.getElementsByTagName('body')[0].classList.add('dashboardLayout');
    
    return () => {
      document.getElementsByTagName('body')[0].classList.remove('dashboardLayout');
    };
},[])
  return (
    <>
      <DashboardHeader />      
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
                {
                    localStorage.getItem('isLoggedIn') ? <Outlet /> : <Navigate to={'/login'}/>
                }
            </div>
          </div>
        </div>
    </>
  );
};
