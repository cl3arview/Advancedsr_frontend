import React from 'react';
import Header from '../components/Header';
import ImageUploadCard from '../components/ImageUploadCard';

// import TestCorsButton from '@/components/TestCorsButton';
 
export default function Home() {
  return (
    <div>

      <Header />
      <ImageUploadCard />
      {/* Uncomment the below code if you need to use the TestCorsButton */}
      {/* <br /><br /><br /><br />
      <center><TestCorsButton /></center> */}
     </div>
  );
}
