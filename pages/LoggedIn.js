import React from 'react';
import Header from '@/components/Header';
import ImageUploadCard from '@/components/ImageUploadCard';
import ImageGrid from '@/components/ImageGrid';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed

const LoggedIn = () => {
  const { username } = useAuth();
  const { authToken } = useAuth();
  console.log(username + " and  " + authToken );
  return (
    <div>
      <Header />
      <ImageUploadCard />
      {username ? <ImageGrid /> : <p>Loading images or not logged in...</p>}
      
    </div>
  );
};

export default LoggedIn;
