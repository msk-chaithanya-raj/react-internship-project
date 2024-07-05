import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Form from './Form';
import SecondPage from './SecondPage/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second-page" element={<PrivateRoute><SecondPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? children : <Navigate to="/" />;
};

export default App;
