import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, AdminSidebar, ConsultantSidebar, DoctorSidebar, Sidebar, ThemeSettings } from './components';
import { AdminOverview, Wards, Calendar, Doctors, Consultants } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import Login from './pages/Login'
import Register from './pages/Register'
import { WRAPPER } from '@syncfusion/ej2/inplace-editor';

   
const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const {user} = useStateContext();
  const Wrapper = ({ component: Component }) => {
  const { isAuthenticated} = useStateContext();
  
    if (isAuthenticated) {
      return <Component />;
    } else {
      return <Login/>;
    }
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div> 

          <div> 
          {user?.role === "admin" && (
            <div>
                {activeMenu? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <AdminSidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <AdminSidebar />
                  </div>
                  
              )}   
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            </div>
          )} 

          {user?.role === "consultant" && (
            <div>
              {activeMenu? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <ConsultantSidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <ConsultantSidebar />
                  </div>
                  
              )}   
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
           </div>
          )} 

          {user?.role === "doctor" && (
            <div>
              {activeMenu? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <DoctorSidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <DoctorSidebar />
                  </div>  
              )}  
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-100% ">
                <Navbar />
              </div>
            </div>
          )}


              <div className={
                  activeMenu? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                <div>
                  {themeSettings && (<ThemeSettings />)}
    
                  <Routes> 
                  {user?.role === "admin" && (
                    <>
                    <Route path="/" element={(<Wrapper component={AdminOverview} />)} />
                    <Route path="/overview" element={(<Wrapper component={AdminOverview} />)} />
                    <Route path="/wards" element={(<Wrapper component={ Wards} />)} />
                    <Route path="/consultants" element={(<Wrapper component={Consultants} />)} />
                    <Route path="/doctors" element={(<Wrapper component={Doctors} />)} />
                    
                    </>
                  )}
                  {user?.role === "consultant" && (
                    <>
                    <Route path="/" element={(<Wrapper component={AdminOverview} />)} />
                    <Route path="/overview" element={(<Wrapper component={AdminOverview} />)} />
                    <Route path="/wards" element={(<Wrapper component={ Wards} />)} />
                    <Route path="/consultants" element={(<Wrapper component={Consultants} />)} />
                    <Route path="/doctors" element={(<Wrapper component={Doctors} />)} />
                    
                    </>
                  )}
                  {user?.role === "doctor" && (
                    <>
                    <Route path="/" element={(<Wrapper component={AdminOverview} />)} />
                    <Route path="/overview" element={(<Wrapper component={AdminOverview} />)} />
                    <Route path="/wards" element={(<Wrapper component={ Wards} />)} />
                    <Route path="/consultants" element={(<Wrapper component={Consultants} />)} />
                    <Route path="/doctors" element={(<Wrapper component={Doctors} />)} />
                    
                    </>
                  )}
                    <Route path="/calendar" element={(<Wrapper component={Calendar} />)} />
                    <Route path="/login" element={(<Wrapper component={Login} />)} />
                    <Route path="/register" element={(<Wrapper component={Register} />)} />
                   
                  </Routes>
                </div>
                <Footer />
                <Register/>
              </div>
            </div> 

        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;