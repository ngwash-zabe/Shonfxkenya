import React from 'react';

const dashboardContainerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #333',
  paddingBottom: '10px'
};

const titleStyle = {
  color: '#4CAF50'
};

const logoutButtonStyle = {
  background: '#ff4d4d',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const statsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '30px'
};

const statCardStyle = {
  background: '#1a2230',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
};

const botControlStyle = {
  marginTop: '40px',
  background: '#1a2230',
  padding: '20px',
  borderRadius: '10px'
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  background: '#2c3e50',
  color: 'white',
  border: '1px solid #333',
  borderRadius: '5px',
  marginBottom: '20px'
};

const startButtonStyle = {
  padding: '12px 20px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};


function Dashboard({ user, onLogout }) {
    
  const handleStartBot = () => {
      // In a real app, you would get the selected strategy
      // and send it to the backend.
      const selectedStrategy = document.getElementById('strategy-select').value;
      alert(`Starting bot with strategy: ${selectedStrategy}`);
      // Example API call:
      // axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bot/start`, { strategy: selectedStrategy });
  }

  return (
    <div style={dashboardContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>shonfxkenya Dashboard</h1>
        <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
      </header>

      <div style={statsContainerStyle}>
        <div style={statCardStyle}>
          <h3>Account Balance</h3>
          <p style={{fontSize: '2em', color: '#4CAF50'}}>{user.balance} {user.currency}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Login ID</h3>
          <p>{user.loginid}</p>
        </div>
         <div style={statCardStyle}>
          <h3>Daily P/L</h3>
          <p>Coming Soon...</p>
        </div>
      </div>

      <div style={botControlStyle}>
        <h2>Bot Control Center</h2>
        <p>Select your trading strategy and start the bot.</p>
        
        <select id="strategy-select" style={selectStyle}>
          <option value="matches_differ">Matches / Differ</option>
          <option value="even_odd">Even / Odd</option>
          <option value="rise_fall">Rise / Fall</option>
          <option value="over_under">Over / Under</option>
          <option value="higher_lower">Higher / Lower</option>
        </select>

        <button onClick={handleStartBot} style={startButtonStyle}>Start Trading Bot</button>
      </div>
    </div>
  );
}

export default Dashboard;