// ImageUpdateContext.js
import React, { createContext, useContext, useState } from 'react';

const ImageUpdateContext = createContext(null);

export const ImageUpdateProvider = ({ children }) => {
  const [updateFlag, setUpdateFlag] = useState(false);

  return (
    <ImageUpdateContext.Provider value={{ updateFlag, setUpdateFlag }}>
      {children}
    </ImageUpdateContext.Provider>
  );
};

export const useImageUpdate = () => useContext(ImageUpdateContext);
