import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './auth-page';
import Invoice from './Invoice'; // Your dashboard

function App() {
  return (
    <Routes>
      {/* Show Auth Page by default */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      
      {/* The Login Page */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* The Dashboard */}
      <Route path="/dashboard" element={<Invoice />} />
    </Routes>
  );
}

export default App;