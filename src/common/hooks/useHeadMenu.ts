import { useEffect, useState } from 'react';

export const useHeadMenu = () => {
  const [headMenu, setHeadMenu] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHeadMenu(document.getElementById('head-menu'));
  }, []);

  return headMenu;
};
