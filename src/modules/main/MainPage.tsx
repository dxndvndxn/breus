import React, { useEffect } from 'react';

const MainPage: React.FC = () => {
  useEffect(() => {
    console.log('Hi Mark');
  }, []);

  return (
    <div className="main">
      <img src="src/assets/images/Pokemon.webp" alt="Pokemon" />
    </div>
  );
};

export default MainPage;
