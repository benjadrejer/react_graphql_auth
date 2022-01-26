import React from 'react';
import useAuth from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const user = useAuth();

  return <div>Dashboard - Hello {user?.email}!</div>;
};

export default Dashboard;
