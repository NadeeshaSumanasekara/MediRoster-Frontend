import React, { useState } from 'react';
import Login from './pages/Login';
import AdminUser from './AdminUser';
import ConsultantUser from './ConsultantUser';
import DoctorUser from './DoctorUser';

function App() {
  // Use state to determine whether to show the login page or the main app page.
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle the login action and switch to the main app page.
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {/* Conditionally render the login page or the main app page based on the 'loggedIn' state. */}
      {loggedIn ? (
        <DoctorUser />
      ) : (
        <DoctorUser onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
