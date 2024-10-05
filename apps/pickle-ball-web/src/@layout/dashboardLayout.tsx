import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { DashboardHeader } from './dashboardHeader';
import { useEffect } from 'react';
import { UserProfileCanvas } from '../@components/widgets/userProfileCanvas';
import { ChangePasswordCanvas } from '../@components/widgets/changePasswordCanvas';

export const DashboardLayout = ({ children }: any) => {
  const navigate = useNavigate();
useEffect   (() => {
    document.getElementsByTagName('body')[0].classList.add('dashboardLayout');
    if(!localStorage.getItem('user')){
      navigate('/login');
    }
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

        <UserProfileCanvas/>
        <ChangePasswordCanvas/>
    </>
  );
};
