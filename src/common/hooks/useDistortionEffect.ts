import { useState } from 'react';

export const useDistortionEffect = () => {
  const [scale, setScale] = useState(0);

  const doDistortionEffect = (from = 60) => {
    from = from - 1;
    const requestAnimationId = requestAnimationFrame(() => setScale(from));

    if (from > 0) {
      const distortionLater = setTimeout(() => {
        cancelAnimationFrame(requestAnimationId);
        doDistortionEffect(from);
        clearTimeout(distortionLater);
      });
    }
  };

  return {
    scale,
    doDistortionEffect,
  };
};
