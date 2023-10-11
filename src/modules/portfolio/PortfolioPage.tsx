import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PORTFOLIOS } from '../../app/routing/appConstants';

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${PORTFOLIOS}`);
  }, []);

  return null;
};
